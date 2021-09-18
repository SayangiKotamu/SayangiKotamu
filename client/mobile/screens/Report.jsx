import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Button,
    Image,
    Dimensions,
    // TouchableOpacity,
} from 'react-native'

// import { Camera } from 'expo-camera'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import * as Firebase from 'firebase'

import { firebaseConfig } from '../firebase'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCategory } from '../store/categories/action'

export default function Report() {
    if (!Firebase.apps.length) {
        Firebase.initializeApp(firebaseConfig)
    }

    const dispatch = useDispatch()

    const [category, setCategory] = useState('')
    const [selectedOrganization, setSelectedOrganization] = useState('')

    const [location, setLocation] = useState(null)
    const [image, setImage] = useState(null)

    const [uploadingImage, setUploadingImage] = useState(false)

    const { categories, loadingCategories } = useSelector((state) => state.categories)

    // const [type, setType] = useState(Camera.Constants.Type.Back)
    // const [isCameraOpen, setIsCameraOpen] = useState(false)
    // const [hasCameraPermission, setHasCameraPermission] = useState(null)

    useEffect(() => {
        ;(async () => {
            let { status: locationStatus } = await Location.requestForegroundPermissionsAsync()
            if (locationStatus !== 'granted') {
                console.log('Permission not granted')
                return
            }

            let location = await Location.getLastKnownPositionAsync({}) //! Masih last known position, kalau getCurrentPositionAsync error terus
            setLocation(location)

            if (Platform.OS !== 'web') {
                console.log('jalan')
                const { status: galleryStatus } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync()
                if (galleryStatus !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!')
                }
            }
        })()

        dispatch(fetchAllCategory())
    }, [])

    async function sendReport() {
        console.log('pencet send report')
        console.log(location) //! Dapet location disini

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
                    console.log(url, '<<< image url') //! Dapet url image disini
                    blob.close()
                    return url
                })
            }
        )
    }

    async function selectPhoto() {
        console.log('mau upload')
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        console.log(result)

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    // async function openCamera() {
    //     ;(async () => {
    //         const { status } = await Camera.requestPermissionsAsync()
    //         setHasCameraPermission(status === 'granted')
    //     })()
    //     setIsCameraOpen(true)
    // }

    // if (isCameraOpen && hasCameraPermission) {
    //     return (
    //         <View style={styles.cameraContainer}>
    //             <Camera style={styles.camera} type={type}>
    //                 <View style={styles.cameraButtonContainer}>
    //                     <TouchableOpacity
    //                         style={styles.cameraButton}
    //                         onPress={() => {
    //                             setType(
    //                                 type === Camera.Constants.Type.back
    //                                     ? Camera.Constants.Type.front
    //                                     : Camera.Constants.Type.back
    //                             )
    //                         }}
    //                     >
    //                         <Text style={styles.cameraText}> Flip </Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </Camera>
    //         </View>
    //     )
    // }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Ionicons name={'arrow-down-circle-sharp'} size={30} color={'#1A73E9'} />
                    <Text style={styles.headingText}>Punya keluhan?</Text>
                    <Text style={styles.headingText}>Yuk sampaikan disini!</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Judul laporan:</Text>
                    <TextInput
                        style={styles.inputTextArea}
                        placeholder="judul laporan dengan singkat..."
                        // value={name}
                        // onChangeText={(text) => setName(text)}
                    />

                    <Text style={styles.label}>Ceritakan laporan kamu:</Text>
                    <TextInput
                        style={styles.inputTextArea}
                        placeholder="sampaikan laporanmu disini..."
                        // value={name}
                        // onChangeText={(text) => setName(text)}
                    />

                    <Text style={styles.label}>Kategori Permasalahan:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={category}
                            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                        >
                            {categories.map((category, idx) => {
                                return (
                                    <Picker.Item
                                        label={category.id}
                                        value={category.name}
                                        key={'category' + idx}
                                    />
                                )
                            })}
                        </Picker>
                    </View>
                    <Text style={styles.label}>Pilih instansi terkait:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedOrganization}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedOrganization(itemValue)
                            }
                        >
                            <Picker.Item label="Dinas A" value="Dinas A" />
                            <Picker.Item label="Dinas B" value="Dinas B" />
                        </Picker>
                    </View>

                    <Text style={styles.label}>Deskripsikan lokasi kejadian:</Text>
                    <TextInput
                        style={styles.inputTextArea}
                        placeholder="cantumkan deskripsi dengan detail..."
                        // value={name}
                        // onChangeText={(text) => setName(text)}
                    />
                    {image ? (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: image }} style={styles.reportImage} />
                        </View>
                    ) : (
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Pilih Foto dari Galeri"
                                color="#05DAA7"
                                onPress={selectPhoto}
                            />
                            {/* <View style={styles.textContainer}>
                                <Text style={styles.text}>Atau</Text>
                            </View>
                            <Button title="Ambil Foto" color="#05DAA7" onPress={openCamera} /> */}
                        </View>
                    )}
                    <View style={styles.buttonContainer}>
                        <Button title="Lapor" color="#1A73E9" onPress={sendReport} />
                    </View>
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
        marginBottom: 50,
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop: 20,
    },
    headingContainer: {
        backgroundColor: '#cce5ff',
        borderWidth: 1,
        borderColor: 'grey',
        width: '96%',
        padding: 3,
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 5,
        marginTop: 15,
        alignItems: 'center',
    },
    pickerContainer: {
        borderBottomWidth: 2,
        borderBottomColor: '#1A73E9',
        paddingBottom: 10,
    },
    headingText: {
        textAlign: 'center',
        color: '#1c5d9b',
        fontWeight: 'bold',
        fontSize: 20,
    },
    label: {
        marginBottom: 5,
        marginTop: 20,
        fontSize: 15,
        color: '#1A73E9',
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#1A73E9',
    },
    inputTextArea: {
        height: 50,
        borderWidth: 2,
        borderColor: '#1A73E9',
        padding: 8,
        borderRadius: 5,
    },
    formContainer: {
        width: '90%',
        marginTop: 15,
    },
    reportImage: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').width / 2,
    },
    textContainer: {
        marginTop: 8,
        marginBottom: 8,
    },
    text: {
        textAlign: 'center',
        color: 'grey',
    },
    camera: {
        flex: 1,
    },
    cameraButtonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    cameraContainer: {
        flex: 1,
    },
    cameraButton: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    cameraText: {
        fontSize: 18,
        color: 'white',
    },
})
