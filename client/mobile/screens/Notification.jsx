import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Notification() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.notificationCardContainer}>
                    <View style={styles.notificationLogo}>
                        <Ionicons name={'notifications-circle-sharp'} size={30} color={'#1A73E9'} />
                    </View>
                    <View style={styles.notificationCardContent}>
                        <Text style={styles.textTitle}>
                            Laporan kamu dengan nama "Terjadi kemacetan di Jl. ABC" sudah selesai
                            ditangani oleh Dinas Perhubungan.
                        </Text>
                        <Text style={styles.textDate}>16 September 2021</Text>
                    </View>
                </View>

                <View style={styles.notificationCardContainer}>
                    <View style={styles.notificationLogo}>
                        <Ionicons name={'notifications-circle-sharp'} size={30} color={'#1A73E9'} />
                    </View>
                    <View style={styles.notificationCardContent}>
                        <Text style={styles.textTitle}>
                            Laporan kamu dengan nama "Terjadi kemacetan di Jl. ABC" sedang di
                            tangani oleh Dinas Perhubungan.
                        </Text>
                        <Text style={styles.textDate}>15 September 2021</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    notificationCardContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
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
