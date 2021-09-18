import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Image, ActivityIndicator } from 'react-native'

import Toast from 'react-native-toast-message'

import { useDispatch, useSelector } from 'react-redux'
import { doRegister } from '../store/auth/action'

export default function Register({ navigation }) {
    const dispatch = useDispatch()
    const { loadingRegister } = useSelector((state) => state.auth)

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')

    function onRegisterClick() {
        if (!email.trim() || !firstName.trim() || !lastName.trim() || !password.trim()) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Mohon input e-mail dan password!',
            })
        } else {
            dispatch(doRegister({ email, firstName, lastName, password })).then(() =>
                navigation.navigate('Masuk')
            )
        }
    }

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

            <View style={styles.buttonContainer}>
                <Button title="Unggah KTP" color="#05DAA7" />
            </View>
            <View style={styles.buttonContainer}>
                {loadingRegister ? (
                    <ActivityIndicator size="large" color="#1A73E9" />
                ) : (
                    <Button title="Daftar" color="#1A73E9" onPress={onRegisterClick} />
                )}
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
