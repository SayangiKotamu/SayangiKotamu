import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Image, ActivityIndicator } from 'react-native'

import Toast from 'react-native-toast-message'

import { useDispatch, useSelector } from 'react-redux'
import { doLogin } from '../store/auth/action'

export default function Login() {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { loadingLogin } = useSelector((state) => state.auth)

    function onLoginClick() {
        if (!email.trim() || !password.trim()) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Mohon input e-mail dan password!',
            })
        } else {
            dispatch(doLogin({ email, password }))
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
                    placeholder="Kata sandi"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <View style={styles.buttonContainer}>
                {loadingLogin ? (
                    <ActivityIndicator size="large" color="#1A73E9" />
                ) : (
                    <Button title="Masuk" color="#1A73E9" onPress={onLoginClick} />
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
        marginTop: 80,
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
    logoImage: {
        width: 250,
        height: 250,
    },
})
