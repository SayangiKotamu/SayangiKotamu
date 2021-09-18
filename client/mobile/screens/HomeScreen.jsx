import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Button, View, StyleSheet } from 'react-native'

import Home from './Home'
import ReportDetail from './ReportDetail'

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
                        <View style={styles.buttonContainer}>
                            <Button color="#1A73E9" onPress={onLogoutClick} title="Logout" />
                        </View>
                    ),
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
