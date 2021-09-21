import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

import SkeletonContent from 'react-native-skeleton-content'

import { fetchAnnouncementById } from '../store/announcements/action'

import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'

import formatDate from '../helpers/formatDate'

const windowWidth = Dimensions.get('window').width

export default function AnnouncementDetail({ route }) {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    })

    const { id } = route.params

    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    const { announcementDetail, loadingAnnouncementDetail } = useSelector(
        (state) => state.announcements
    )

    useEffect(() => {
        if (isFocused) {
            dispatch(fetchAnnouncementById(id))
        }
    }, [isFocused])

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <ScrollView>
            {loadingAnnouncementDetail ? (
                <SkeletonContent
                    containerStyle={{ flex: 1, width: windowWidth, marginTop: 5 }}
                    animationDirection="horizontalLeft"
                    layout={[
                        {
                            width: windowWidth,
                            height: 400,
                            marginRight: 30,
                            marginTop: 10,
                        },
                    ]}
                    isLoading={loadingAnnouncementDetail}
                />
            ) : (
                <View style={styles.container}>
                    <View style={styles.announcementCardContainer}>
                        <View>
                            <Ionicons
                                name={'information-circle-sharp'}
                                size={40}
                                color={'tomato'}
                            />
                        </View>
                        <View style={styles.announcementCardContent}>
                            <Text style={styles.textTitle}>{announcementDetail?.title}</Text>
                            <Text style={styles.textOrganization}>
                                {announcementDetail?.dinas?.name}
                            </Text>
                            <Text style={styles.textDate}>
                                Pengumuman dibuat pada {formatDate(announcementDetail?.date)}
                            </Text>

                            <View style={styles.horizontalLine} />

                            <Text style={styles.textDescription}>
                                {announcementDetail?.announcment}
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    horizontalLine: {
        marginTop: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    announcementCardContainer: {
        backgroundColor: 'white',
        borderColor: '#ececec',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
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
        flexGrow: 1,
        flex: 1,
    },
    textTitle: {
        marginTop: 5,
        fontSize: 19,
        fontWeight: 'bold',
    },
    textOrganization: {
        backgroundColor: 'tomato',
        padding: 8,
        marginTop: 8,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 5,
        color: 'white',
        fontWeight: 'bold',
    },
    textDescription: {
        padding: 3,
        textAlign: 'justify',
        marginRight: 12,
        fontSize: 13,
        marginTop: 20,
        marginBottom: 30,
        fontFamily: 'Poppins_600SemiBold',
    },
    textDate: {
        marginTop: 10,
        fontSize: 12,
        color: 'grey',
    },
})
