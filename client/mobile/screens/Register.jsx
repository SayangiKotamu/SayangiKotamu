import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    TextInput,
    Image,
    ActivityIndicator,
    Dimensions,
    Text,
    TouchableOpacity,
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { doRegister } from '../store/auth/action'

import * as ImagePicker from 'expo-image-picker'
import * as Firebase from 'firebase'

import { firebaseConfig } from '../firebase'
import { GOOGLE_CLOUD_VISION_API_KEY } from 'react-native-dotenv'

import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'

import CustomButton from '../components/CustomButton'
import Toast from 'react-native-toast-message'

export default function Register({ navigation }) {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    })

    if (!Firebase.apps.length) {
        Firebase.initializeApp(firebaseConfig)
    }

    const dispatch = useDispatch()
    const { loadingRegister } = useSelector((state) => state.auth)

    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [NIK, setNIK] = useState('')
    const [KTPLink, setKTPLink] = useState('')
    const [city, setCity] = useState('')
    const [password, setPassword] = useState('')

    const [image, setImage] = useState(null)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [analyzingImage, setAnalyzingImage] = useState(false)

    useEffect(() => {
        ;(async () => {
            if (Platform.OS !== 'web') {
                const { status: galleryStatus } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync()
                if (galleryStatus !== 'granted') {
                    Toast.show({
                        type: 'error',
                        position: 'bottom',
                        bottomOffset: 70,
                        text1: 'SayangiKotamu',
                        text2: 'Mohon maaf, kami membutuhkan akses galeri',
                    })
                }
            }
        })()
    }, [])

    useEffect(() => {
        if (image) {
            uploadPhoto()
        }
    }, [image])

    useEffect(() => {
        if (KTPLink) {
            submitToGoogle()
        }
    }, [KTPLink])

    async function submitToGoogle() {
        try {
            setAnalyzingImage(true)

            let body = JSON.stringify({
                requests: [
                    {
                        features: [
                            { type: 'TEXT_DETECTION', maxResults: 5 },
                            { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
                        ],
                        image: {
                            source: {
                                imageUri: KTPLink,
                            },
                        },
                    },
                ],
            })
            let response = await fetch(
                `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body,
                }
            )
            let responseJson = await response.json()

            //! Autopopulate (masih NIK aja = number yang lebih dari 12 digit)
            const result = responseJson.responses[0].fullTextAnnotation.text

            const detectedNIK = result.match(/\b\d{12,}\b/g)[0]
            setNIK(detectedNIK)

            Toast.show({
                type: 'info',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Beberapa form sudah terisi dengan otomatis, mohon dicek kembali ya!',
            })
        } catch (error) {
            console.log(error)
        } finally {
            setAnalyzingImage(false)
        }
    }

    async function selectPhoto() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    async function uploadPhoto() {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = function () {
                resolve(xhr.response)
            }
            xhr.onerror = function () {
                reject(new TypeError('network request failed'))
            }
            xhr.responseType = 'blob'
            xhr.open('GET', image, true)
            xhr.send(null)
        })
        const ref = Firebase.storage().ref().child(new Date().toISOString())
        const snapshot = ref.put(blob)
        snapshot.on(
            Firebase.storage.TaskEvent.STATE_CHANGED,
            () => {
                setUploadingImage(true)
            },
            (error) => {
                setUploadingImage(false)
                console.log(error)
                blob.close()
                return
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setUploadingImage(false)
                    setKTPLink(url)
                    blob.close()
                    return url
                })
            }
        )
    }

    async function onRegisterClick() {
        if (
            !fullName.trim() ||
            !email.trim() ||
            !password.trim() ||
            !NIK.trim() ||
            !KTPLink ||
            !city.trim()
        ) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Mohon input form register dengan lengkap!',
            })
        } else {
            const payload = {
                fullName,
                email,
                password,
                NIK,
                ktp: KTPLink,
                kota: city,
            }

            dispatch(doRegister(payload))
        }
    }

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Image
                        style={styles.logoImage}
                        source={{
                            uri: 'https://i.imgur.com/GKQ7zUt.jpeg',
                        }}
                    />
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nama lengkap"
                        value={fullName}
                        onChangeText={(text) => setFullName(text)}
                    />
                    {analyzingImage ? (
                        <View style={styles.loadingKTP}>
                            <ActivityIndicator size="small" color="black" />
                            <Text style={styles.loadingKTPText}>Menganalisa KTP</Text>
                        </View>
                    ) : (
                        <TextInput
                            style={styles.input}
                            placeholder="Nomor Induk Kependudukan (NIK)"
                            value={NIK}
                            onChangeText={(text) => setNIK(text)}
                        />
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Kota"
                        value={city}
                        onChangeText={(text) => setCity(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Kata sandi"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                {uploadingImage ? (
                    <View stlye={styles.imageContainer}>
                        <ActivityIndicator size="large" color="black" />
                    </View>
                ) : (
                    <>
                        {image && (
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: image }} style={styles.ktpImage} />
                            </View>
                        )}
                    </>
                )}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={selectPhoto}>
                        <CustomButton buttonName={'Unggah KTP'} buttonColor={'tomato'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainerBottom}>
                    {loadingRegister ? (
                        <ActivityIndicator size="large" color="black" />
                    ) : (
                        <TouchableOpacity onPress={onRegisterClick}>
                            <CustomButton buttonName={'Daftar'} buttonColor={'black'} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    loadingKTP: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    loadingKTPText: {
        marginTop: 15,
        marginLeft: 10,
        color: 'grey',
        fontFamily: 'Poppins_600SemiBold',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        marginTop: '15%',
        marginBottom: '15%',
    },
    formContainer: {
        width: '80%',
        marginTop: 30,
        padding: 5,
        borderRadius: 10,
    },
    headingContainer: {
        marginTop: 30,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#ececec',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 2,
        borderRadius: 250,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20,
        width: '80%',
    },
    buttonContainerBottom: {
        marginTop: 10,
        width: '80%',
        marginBottom: '10%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    slogan: {
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        fontFamily: 'Poppins_600SemiBold',
    },
    logoImage: {
        width: 250,
        height: 250,
        borderRadius: 250,
        borderColor: 'grey',
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ktpImage: {
        width: Dimensions.get('window').width / 1.5,
        height: Dimensions.get('window').width / 2,
        borderRadius: 10,
    },
})
