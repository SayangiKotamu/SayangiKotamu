import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

export default function Login() {
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.title}>SayangiKotamu</Text>
                <Text style={styles.slogan}>Yuk #LiveSmart</Text>
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
                    placeholder="Kata sandi"
                    // value={name}
                    // onChangeText={(text) => setName(text)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Masuk" color="#1A73E9" />
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
        marginTop: 150,
        padding: 5,
        borderRadius: 10,
    },
    headingContainer: {
        marginTop: 30,
    },
    buttonContainer: {
        marginTop: 90,
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
})
