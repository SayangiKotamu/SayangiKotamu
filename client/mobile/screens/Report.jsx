import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Report() {
    const [category, setCategory] = useState('')
    const [selectedOrganization, setSelectedOrganization] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Ionicons name={'arrow-down-circle-sharp'} size={30} color={'#1A73E9'} />
                <Text style={styles.headingText}>Punya keluhan?</Text>
                <Text style={styles.headingText}>Yuk sampaikan disini!</Text>
            </View>

            <View style={styles.formContainer}>
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
                        <Picker.Item label="Masalah Lalu Lintas" value="Masalah Lalu Lintas" />
                        <Picker.Item
                            label="Masalah Sarana/Fasilitas Umum"
                            value="Masalah Sarana/Fasilitas Umum"
                        />
                        <Picker.Item label="Masalah Kriminal" value="Masalah Kriminal" />
                        <Picker.Item label="Masalah Kesehatan" value="Masalah Kesehatan" />
                        <Picker.Item label="Masalah Kebersihan" value="Masalah Kebersihan" />
                        <Picker.Item label="Masalah Lainnya" value="Masalah Lainnya" />
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

                <Text style={styles.label}>Deskripsikan lokasi kejadian:</Text>
                <TextInput
                    style={styles.inputTextArea}
                    placeholder="cantumkan deskripsi dengan detail..."
                    // value={name}
                    // onChangeText={(text) => setName(text)}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Unggah Bukti Foto" color="#05DAA7" />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Lapor" color="#1A73E9" />
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
    buttonContainer: {
        marginTop: 50,
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
        marginTop: 20,
    },
})
