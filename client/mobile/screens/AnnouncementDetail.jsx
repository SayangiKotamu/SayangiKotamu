import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'

import SkeletonContent from 'react-native-skeleton-content'

import { fetchAnnouncementById } from '../store/announcements/action'

const windowWidth = Dimensions.get('window').width

export default function AnnouncementDetail({ route }) {
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
                                color={'#1A73E9'}
                            />
                        </View>
                        <View style={styles.announcementCardContent}>
                            <Text style={styles.textTitle}>{announcementDetail?.title}</Text>
                            <Text style={styles.textOrganization}>
                                {announcementDetail?.dinas?.name}
                            </Text>
                            <Text style={styles.textDate}>
                                Pengumuman dibuat pada {announcementDetail?.date?.split('T')[0]}
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
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    announcementCardContainer: {
        backgroundColor: 'white',
        borderColor: '#ececec',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
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
        marginTop: 5,
        fontSize: 19,
        fontWeight: 'bold',
    },
    textOrganization: {
        backgroundColor: '#05DAA7',
        width: '70%',
        padding: 8,
        marginTop: 8,
        borderRadius: 10,
        marginLeft: 2,
        color: 'white',
        fontWeight: 'bold',
    },
    textDescription: {
        fontSize: 15,
        marginTop: 20,
        marginBottom: 30,
    },
    textDate: {
        marginTop: 10,
        fontSize: 12,
        color: 'grey',
    },
})
