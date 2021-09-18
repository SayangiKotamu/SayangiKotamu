import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Dimensions, RefreshControl } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllAnnouncement } from '../store/announcements/action'

import SkeletonContent from 'react-native-skeleton-content'

import AnnouncementCard from '../components/AnnouncementCard'

const windowWidth = Dimensions.get('window').width

export default function Announcement({ navigation }) {
    const dispatch = useDispatch()

    const { announcements, loadingAnnouncements } = useSelector((state) => state.announcements)

    const [isRefreshing, setIsRefreshing] = useState(false)

    function onRefresh() {
        setIsRefreshing(true)
        dispatch(fetchAllAnnouncement())
        setIsRefreshing(false)
    }

    useEffect(() => {
        dispatch(fetchAllAnnouncement())
    }, [])

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.container}>
                {loadingAnnouncements ? (
                    <SkeletonContent
                        containerStyle={{ flex: 1, width: windowWidth, marginTop: 5 }}
                        animationDirection="horizontalLeft"
                        layout={[
                            {
                                width: windowWidth,
                                height: 100,
                                marginTop: 10,
                            },
                            {
                                width: windowWidth,
                                height: 100,
                                marginTop: 10,
                            },
                            {
                                width: windowWidth,
                                height: 100,
                                marginTop: 10,
                            },
                        ]}
                        isLoading={loadingAnnouncements}
                    />
                ) : (
                    <>
                        {announcements.map((announcement, idx) => {
                            return (
                                <AnnouncementCard
                                    announcement={announcement}
                                    key={'announcement' + idx}
                                />
                            )
                        })}
                    </>
                )}
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
})
