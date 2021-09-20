import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Ionicons from '@expo/vector-icons/Ionicons'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllDinas } from '../store/dinas/action'
import { sendAspiration } from '../store/aspiration/action'

import Toast from 'react-native-toast-message'

export default function Aspiration({ navigation }) {
    const dispatch = useDispatch()

    const { dinas, loadingDinas } = useSelector((state) => state.dinas)
    const { loadingSendAspiration } = useSelector((state) => state.aspiration)

    const [type, setType] = useState('Kritik')
    const [selectedDinas, setSelectedDinas] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        dispatch(fetchAllDinas())
    }, [])

    function resetAllForm() {
        setType('Kritik')
        setTitle('')
        setSelectedDinas('')
        setDescription('')
    }

    function onSubmitClick() {
        if (!title.trim() || !type || !selectedDinas || !description.trim()) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Mohon input form aspirasi dengan lengkap!',
            })
        } else {
            const payload = {
                type,
                dinas: selectedDinas,
                title,
                description,
            }

            dispatch(sendAspiration(payload)).then(() => {
                resetAllForm()
                navigation.navigate('Beranda')
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Ionicons name={'arrow-down-circle-sharp'} size={30} color={'#1A73E9'} />
                <Text style={styles.headingText}>Punya aspirasi untuk pemerintah?</Text>
                <Text style={styles.headingText}>Yuk sampaikan disini!</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Jenis Aspirasi:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={type}
                        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Kritik" value="Kritik" />
                        <Picker.Item label="Saran" value="Saran" />
                    </Picker>
                </View>
                <Text style={styles.label}>Pilih instansi terkait:</Text>
                {loadingDinas ? (
                    <ActivityIndicator size="large" color="#1A73E9" />
                ) : (
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedDinas}
                            onValueChange={(itemValue, itemIndex) => setSelectedDinas(itemValue)}
                        >
                            <Picker.Item label={'Pilih dinas'} value={''} />
                            {dinas.map((eachDinas, idx) => {
                                return (
                                    <Picker.Item
                                        label={eachDinas.name}
                                        value={eachDinas._id}
                                        key={'dinas' + idx}
                                    />
                                )
                            })}
                        </Picker>
                    </View>
                )}
                <Text style={styles.label}>Berikan judul aspirasi mu:</Text>
                <TextInput
                    style={styles.inputTextArea}
                    placeholder="judul aspirasi dengan singkat..."
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                <Text style={styles.label}>Ceritakan aspirasi mu disini:</Text>
                <TextInput
                    style={styles.inputTextArea}
                    placeholder="sampaikan aspirasimu disini..."
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
                <View style={styles.buttonContainer}>
                    {loadingSendAspiration ? (
                        <ActivityIndicator size="large" color="#1A73E9" />
                    ) : (
                        <Button title="Kirim" color="#1A73E9" onPress={onSubmitClick} />
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    headingContainer: {
        backgroundColor: '#cce5ff',
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
    headingText: {
        textAlign: 'center',
        color: '#1c5d9b',
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonContainer: {
        marginTop: 50,
    },
    formContainer: {
        width: '90%',
        marginTop: 20,
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
    label: {
        marginBottom: 5,
        marginTop: 20,
        fontSize: 15,
        color: '#1A73E9',
        fontWeight: 'bold',
    },
    pickerContainer: {
        borderBottomWidth: 2,
        borderBottomColor: '#1A73E9',
        paddingBottom: 10,
    },
})
