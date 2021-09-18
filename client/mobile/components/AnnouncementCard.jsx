import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

import formatCharactersByLimit from '../helpers/formatCharactersByLimit'

export default function AnnouncementCard(props) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            style={styles.announcementCardContainer}
            onPress={() => navigation.navigate('Detail Pengumuman', { id: props.announcement.id })}
        >
            <View style={styles.notificationLogo}>
                <Ionicons name={'information-circle-sharp'} size={30} color={'#1A73E9'} />
            </View>
            <View style={styles.announcementCardContent}>
                <Text style={styles.textTitle}>{props.announcement.title}</Text>
                <Text style={styles.textInstances}>{props.announcement.dinas.name}</Text>
                <Text style={styles.textDate}>
                    Pengumuman dibuat pada {props.announcement.date.split('T')[0]}
                </Text>
                <Text style={styles.textDescription}>
                    {formatCharactersByLimit(props.announcement.announcement)}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    announcementCardContainer: {
        backgroundColor: 'white',
        borderColor: 'grey',
        marginTop: 8,
        borderWidth: 1,
        borderRadius: 5,
        paddingBottom: 5,
        width: '100%',
        flexDirection: 'row',
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
        fontWeight: 'bold',
    },
    textDescription: {
        fontSize: 12,
        marginTop: 10,
        color: 'black',
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
