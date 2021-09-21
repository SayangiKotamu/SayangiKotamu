import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { StyleSheet, TouchableOpacity } from 'react-native'

import Home from './Home'
import ReportDetail from './ReportDetail'

import Ionicons from '@expo/vector-icons/Ionicons'

import { setIsLoggedIn, setAccessToken } from '../store/auth/action'

import { useDispatch } from 'react-redux'

import Toast from 'react-native-toast-message'

const Stack = createStackNavigator()

export default function HomeScreen() {
    const dispatch = useDispatch()

    function onLogoutClick() {
        dispatch(setIsLoggedIn(false))
        dispatch(setAccessToken(''))

        Toast.show({
            type: 'success',
            position: 'bottom',
            bottomOffset: 70,
            text1: 'SayangiKotamu',
            text2: 'Berhasil logout dari SayangiKotamu',
        })
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Halaman Beranda"
                component={Home}
                options={{
                    headerRight: () => (
                        <TouchableOpacity style={styles.buttonContainer} onPress={onLogoutClick}>
                            <Ionicons name={'exit-outline'} size={30} color={'white'} />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: 'tomato',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen name="Detail Laporan" component={ReportDetail} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginRight: 13,
    },
})
