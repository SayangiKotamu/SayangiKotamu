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
    RefreshControl,
    Image,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'

import Toast from 'react-native-toast-message'
import CustomButton from '../components/CustomButton'

import { Camera } from 'expo-camera'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import * as Firebase from 'firebase'

import { firebaseConfig } from '../firebase'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCategory } from '../store/categories/action'
import { fetchAllDinas } from '../store/dinas/action'
import { addReport } from '../store/reports/action'

import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'

let camera = Camera

export default function Report({ navigation }) {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    })

    if (!Firebase.apps.length) {
        Firebase.initializeApp(firebaseConfig)
    }

    const dispatch = useDispatch()

    const { categories, loadingCategories } = useSelector((state) => state.categories)
    const { dinas, loadingDinas } = useSelector((state) => state.dinas)
    const { loadingSendReport } = useSelector((state) => state.reports)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [selectedDinas, setSelectedDinas] = useState('')
    const [locationDescription, setLocationDescription] = useState('')
    const [location, setLocation] = useState(null)
    const [image, setImage] = useState(null)

    const [uploadingImage, setUploadingImage] = useState(false)

    const [isCameraOpen, setIsCameraOpen] = useState(false)
    const [hasCameraPermission, setHasCameraPermission] = useState(null)

    const [isRefreshing, setIsRefreshing] = useState(false)

    function resetAllForm() {
        setTitle('')
        setDescription('')
        setCategory('')
        setSelectedDinas('')
        setLocationDescription('')
        setLocation(null)
        setImage(null)
    }

    function onRefresh() {
        setIsRefreshing(true)
        resetAllForm()
        setIsRefreshing(false)
    }

    useEffect(() => {
        ;(async () => {
            let { status: locationStatus } = await Location.requestForegroundPermissionsAsync()
            if (locationStatus !== 'granted') {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    bottomOffset: 70,
                    text1: 'SayangiKotamu',
                    text2: 'Mohon maaf, kami membutuhkan akses lokasi',
                })
                return
            }

            let location = await Location.getLastKnownPositionAsync({}) //! Masih last known position, kalau getCurrentPositionAsync error terus
            setLocation(location)

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

        dispatch(fetchAllCategory())
        dispatch(fetchAllDinas())
    }, [])

    async function sendReport() {
        if (
            !title.trim() ||
            !description.trim() ||
            !locationDescription.trim() ||
            !category ||
            !selectedDinas ||
            !location ||
            !image
        ) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Mohon input form laporan dengan lengkap!',
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
                            title,
                            description,
                            location: locationDescription,
                            lat: location.coords.latitude,
                            long: location.coords.longitude,
                            picture: url,
                            dinas: selectedDinas,
                            category,
                        }

                        dispatch(addReport(payload)).then(() => {
                            resetAllForm()
                            navigation.navigate('Beranda')
                        })

                        blob.close()
                        return url
                    })
                }
            )
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

    async function openCamera() {
        ;(async () => {
            const { status } = await Camera.requestPermissionsAsync()
            setHasCameraPermission(status === 'granted')
        })()
        setIsCameraOpen(true)
    }

    async function takePicture() {
        const photo = await camera.takePictureAsync()
        setImage(photo.uri)
        setIsCameraOpen(false)
    }

    if (!fontsLoaded) {
        return <AppLoading />
    }

    if (isCameraOpen && hasCameraPermission) {
        return (
            <View style={styles.cameraContainer}>
                <Camera
                    style={styles.camera}
                    type={Camera.Constants.Type.Back}
                    ref={(ref) => (camera = ref)}
                >
                    <View style={styles.cameraButtonContainer}>
                        <TouchableOpacity
                            onPress={takePicture}
                            style={{
                                width: 70,
                                height: 70,
                                bottom: 0,
                                borderRadius: 50,
                                backgroundColor: 'white',
                                borderColor: 'tomato',
                                borderWidth: 10,
                            }}
                        />
                    </View>
                </Camera>
            </View>
        )
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Ionicons name={'arrow-down-circle-sharp'} size={30} color={'white'} />
                    <Text style={styles.headingText}>Punya keluhan?</Text>
                    <Text style={styles.headingText}>Yuk sampaikan disini!</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Judul laporan:</Text>
                    <TextInput
                        style={styles.inputTextArea}
                        placeholder="judul laporan dengan singkat..."
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />

                    <Text style={styles.label}>Ceritakan laporan kamu:</Text>
                    <TextInput
                        style={styles.inputTextArea}
                        placeholder="sampaikan laporanmu disini..."
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />

                    <Text style={styles.label}>Kategori Permasalahan:</Text>
                    {loadingCategories ? (
                        <ActivityIndicator size="large" color="black" />
                    ) : (
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={category}
                                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                            >
                                <Picker.Item
                                    style={styles.pickerText}
                                    label={'Pilih kategori permasalahan'}
                                    value={''}
                                />
                                {categories.map((category, idx) => {
                                    return (
                                        <Picker.Item
                                            style={styles.pickerText}
                                            label={category.name}
                                            value={category._id}
                                            key={'category' + idx}
                                        />
                                    )
                                })}
                            </Picker>
                        </View>
                    )}
                    <Text style={styles.label}>Pilih instansi terkait:</Text>

                    {loadingDinas ? (
                        <ActivityIndicator size="large" color="black" />
                    ) : (
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedDinas}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedDinas(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.pickerText}
                                    label={'Pilih dinas'}
                                    value={''}
                                />
                                {dinas.map((eachDinas, idx) => {
                                    return (
                                        <Picker.Item
                                            label={eachDinas.name}
                                            value={eachDinas._id}
                                            key={'dinas' + idx}
                                            style={styles.pickerText}
                                        />
                                    )
                                })}
                            </Picker>
                        </View>
                    )}

                    <Text style={styles.label}>Deskripsikan lokasi kejadian:</Text>
                    <TextInput
                        style={styles.inputTextArea}
                        placeholder="cantumkan deskripsi dengan detail..."
                        value={locationDescription}
                        onChangeText={(text) => setLocationDescription(text)}
                    />
                    <Text style={styles.notes}>
                        <Text style={styles.notesEmphasize}>Catatan:</Text> SayangiKotamu akan
                        menyimpan data lokasi mu secara otomatis
                    </Text>
                    {image ? (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: image }} style={styles.reportImage} />
                        </View>
                    ) : (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={selectPhoto}>
                                <CustomButton
                                    buttonName={'Pilih foto dari Galeri'}
                                    buttonColor={'tomato'}
                                />
                            </TouchableOpacity>

                            <View style={styles.buttonTwo}>
                                <TouchableOpacity onPress={openCamera}>
                                    <CustomButton
                                        buttonName={'Ambil Foto'}
                                        buttonColor={'tomato'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    <View style={styles.buttonContainerBottom}>
                        {uploadingImage || loadingSendReport ? (
                            <ActivityIndicator size="large" color="black" />
                        ) : (
                            <TouchableOpacity onPress={sendReport}>
                                <CustomButton buttonName={'Lapor'} buttonColor={'black'} />
                            </TouchableOpacity>
                        )}
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
        marginBottom: '30%',
    },
    notesEmphasize: {
        fontWeight: 'bold',
    },
    notes: {
        textAlign: 'center',
        fontSize: 10,
        marginTop: 5,
        color: 'grey',
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop: 20,
    },
    buttonTwo: {
        marginTop: 10,
    },
    pickerText: {
        color: 'grey',
        fontFamily: 'Poppins_600SemiBold',
    },
    buttonContainerBottom: {
        marginTop: 40,
        marginBottom: 20,
    },
    headingContainer: {
        backgroundColor: 'tomato',
        borderWidth: 1,
        borderColor: '#ececec',
        width: '96%',
        padding: 3,
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 5,
        marginTop: 15,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#ececec',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 8,
    },
    pickerContainer: {
        borderBottomWidth: 2,
        borderBottomColor: 'tomato',
        paddingBottom: 10,
    },
    headingText: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
    },
    label: {
        marginBottom: 5,
        marginTop: 20,
        fontSize: 15,
        color: 'tomato',
        fontFamily: 'Poppins_600SemiBold',
    },
    input: {
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: 'tomato',
    },
    inputTextArea: {
        height: 50,
        borderWidth: 2,
        borderColor: 'tomato',
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
        height: '30%',
    },
    cameraButtonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: '30%',
    },
    cameraContainer: {
        flex: 1,
    },
    cameraButton: {
        flex: 0.1,
        alignItems: 'center',
    },
    cameraText: {
        fontSize: 18,
        color: 'white',
    },
})
