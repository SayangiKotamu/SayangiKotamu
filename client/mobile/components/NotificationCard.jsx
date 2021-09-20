import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function NotificationCard(props) {
    return (
        <View style={styles.notificationCardContainer}>
            <View>
                <Ionicons name={'notifications-circle-sharp'} size={30} color={'#1A73E9'} />
            </View>
            <View style={styles.notificationCardContent}>
                <Text style={styles.textTitle}>{props.notification.description}</Text>
                <Text style={styles.textDate}>{props.notification.date.split('T')[0]}</Text>
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
    },
    textDate: {
        fontSize: 11,
        marginTop: 1,
    },
})
