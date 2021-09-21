import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'

import formatDate from '../helpers/formatDate'

export default function NotificationCard(props) {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <View style={styles.notificationCardContainer}>
            <View>
                <Ionicons name={'notifications-circle-sharp'} size={50} color={'tomato'} />
            </View>
            <View style={styles.notificationCardContent}>
                <Text style={styles.textTitle}>{props.notification.description}</Text>
                <Text style={styles.textDate}>{formatDate(props.notification.date)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    notificationCardContainer: {
        backgroundColor: 'white',
        borderColor: '#ececec',
        marginTop: 10,
        borderBottomWidth: 1,
        width: '100%',
        flexDirection: 'row',
        paddingBottom: 8,
        marginLeft: 10,
    },
    notificationCardContent: {
        marginLeft: 10,
        padding: 3,
        width: '100%',
        flexGrow: 1,
        flex: 1,
    },
    textTitle: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
        marginRight: 12,
    },
    textDate: {
        fontSize: 11,
        marginTop: 1,
        color: 'grey',
    },
})
