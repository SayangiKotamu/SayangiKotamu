import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    TextInput,
    Button,
    Image,
    ActivityIndicator,
    Dimensions,
} from 'react-native'

import Toast from 'react-native-toast-message'

import { useDispatch, useSelector } from 'react-redux'
import { doRegister } from '../store/auth/action'

import * as ImagePicker from 'expo-image-picker'
import * as Firebase from 'firebase'

import { firebaseConfig } from '../firebase'

export default function Register({ navigation }) {
    if (!Firebase.apps.length) {
        Firebase.initializeApp(firebaseConfig)
    }

    const dispatch = useDispatch()
    const { loadingRegister } = useSelector((state) => state.auth)

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')

    const [image, setImage] = useState(null)
    const [uploadingImage, setUploadingImage] = useState(false)

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

    async function onRegisterClick() {
        if (!email.trim() || !firstName.trim() || !lastName.trim() || !password.trim() || !image) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Mohon input form register dengan lengkap!',
            })
        } else {
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

                        //* Proses dispatch
                        const payload = {
                            email,
                            firstName,
                            lastName,
                            password,
                            ktp: url,
                        }

                        dispatch(doRegister(payload)).then(() => {
                            navigation.navigate('Masuk')
                        })

                        blob.close()
                        return url
                    })
                }
            )
        }
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
                        placeholder="Nama depan"
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nama belakang"
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Kata sandi"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                {image ? (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.ktpImage} />
                    </View>
                ) : (
                    <View style={styles.buttonContainer}>
                        <Button title="Unggah KTP" color="#05DAA7" onPress={selectPhoto} />
                    </View>
                )}
                <View style={styles.buttonContainer}>
                    {uploadingImage || loadingRegister ? (
                        <ActivityIndicator size="large" color="#1A73E9" />
                    ) : (
                        <Button title="Daftar" color="#1A73E9" onPress={onRegisterClick} />
                    )}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        marginTop: 30,
        padding: 5,
        borderRadius: 10,
    },
    headingContainer: {
        marginTop: 30,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20,
        width: '80%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1A73E9',
        textAlign: 'center',
    },
    slogan: {
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: 'blue',
    },
    logoImage: {
        width: 250,
        height: 250,
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ktpImage: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').width / 2,
    },
})
