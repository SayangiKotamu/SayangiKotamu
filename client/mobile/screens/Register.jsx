import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native'

export default function Register() {
    return (
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
                    // value={name}
                    // onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nama depan"
                    // value={name}
                    // onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nama belakang"
                    // value={name}
                    // onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Kata sandi"
                    // value={name}
                    // onChangeText={(text) => setName(text)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Unggah KTP" color="#05DAA7" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Daftar" color="#1A73E9" />
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
        marginTop: 50,
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
})