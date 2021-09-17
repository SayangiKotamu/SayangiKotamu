import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Aspiration() {
    const [aspirationType, setAspirationType] = useState('')
    const [selectedOrganization, setSelectedOrganization] = useState('')

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
                        selectedValue={aspirationType}
                        onValueChange={(itemValue, itemIndex) => setAspirationType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Kritik" value="kritik" />
                        <Picker.Item label="Saran" value="saran" />
                    </Picker>
                </View>
                <Text style={styles.label}>Pilih instansi terkait:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedOrganization}
                        onValueChange={(itemValue, itemIndex) => setSelectedOrganization(itemValue)}
                    >
                        <Picker.Item label="Dinas A" value="Dinas A" />
                        <Picker.Item label="Dinas B" value="Dinas B" />
                    </Picker>
                </View>
                <Text style={styles.label}>Ceritakan aspirasi mu disini:</Text>
                <TextInput
                    style={styles.inputTextArea}
                    placeholder="sampaikan aspirasimu disini..."
                    // value={name}
                    // onChangeText={(text) => setName(text)}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Kirim" color="#1A73E9" />
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
        borderColor: 'grey',
        width: '96%',
        padding: 3,
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 5,
        marginTop: 15,
        alignItems: 'center',
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
