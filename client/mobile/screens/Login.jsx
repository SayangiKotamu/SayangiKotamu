import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { doLogin } from '../store/auth/action'

import Toast from 'react-native-toast-message'
import CustomButton from '../components/CustomButton'

import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'

export default function Login() {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    })

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

    if (!fontsLoaded) {
        return <AppLoading />
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
                        placeholder="Kata sandi"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    {loadingLogin ? (
                        <ActivityIndicator size="large" color="black" />
                    ) : (
                        <TouchableOpacity onPress={onLoginClick}>
                            <CustomButton buttonName={'Masuk'} buttonColor={'black'} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        marginTop: '15%',
    },
    formContainer: {
        width: '80%',
        marginTop: 80,
        padding: 5,
        borderRadius: 10,
    },
    headingContainer: {
        marginTop: 30,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#ececec',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 2,
        borderRadius: 250,
    },
    buttonContainer: {
        marginTop: 90,
        width: '80%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    slogan: {
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        fontFamily: 'Poppins_600SemiBold',
    },
    logoImage: {
        width: 250,
        height: 250,
        borderRadius: 250,
        borderColor: 'grey',
    },
})
