import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

import formatCharactersByLimit from '../helpers/formatCharactersByLimit'

import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'

export default function AnnouncementCard(props) {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    })

    const navigation = useNavigation()

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <TouchableOpacity
            style={styles.announcementCardContainer}
            onPress={() => navigation.navigate('Detail Pengumuman', { id: props.announcement._id })}
        >
            <View style={styles.notificationLogo}>
                <Ionicons name={'information-circle-sharp'} size={30} color={'tomato'} />
            </View>
            <View style={styles.announcementCardContent}>
                <Text style={styles.textTitle}>{props.announcement.title}</Text>
                <Text style={styles.textInstances}>{props.announcement.dinas.name}</Text>
                <Text style={styles.textDate}>
                    Pengumuman dibuat pada {props.announcement.date.split('T')[0]}
                </Text>
                <Text style={styles.textDescription}>
                    {formatCharactersByLimit(props.announcement.announcment)}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    announcementCardContainer: {
        backgroundColor: 'white',
        borderColor: '#ececec',
        marginTop: 8,
        borderWidth: 1,
        borderRadius: 5,
        paddingBottom: 5,
        width: '100%',
        flexDirection: 'row',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#ececec',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 2,
    },
    announcementCardContent: {
        marginLeft: 10,
        padding: 3,
        width: '100%',
        flexGrow: 1,
        flex: 1,
    },
    textTitle: {
        fontSize: 18,
        color: '#062158',
        fontFamily: 'Poppins_600SemiBold',
    },
    textDescription: {
        fontSize: 10,
        marginTop: 10,
        color: 'black',
        fontFamily: 'Poppins_600SemiBold',
    },
    textDate: {
        fontSize: 11,
        marginTop: 1,
        color: 'grey',
    },
    textInstances: {
        fontSize: 13,
    },
    heading: {
        fontSize: 18,
        marginTop: '1%',
        color: '#1A73E9',
        fontWeight: 'bold',
    },
})
