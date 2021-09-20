import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, RefreshControl, Dimensions, Text } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { fetchNotification } from '../store/notification/action'

import SkeletonContent from 'react-native-skeleton-content'

import NotificationCard from '../components/NotificationCard'

import AntDesign from '@expo/vector-icons/AntDesign'

const windowWidth = Dimensions.get('window').width

export default function Notification() {
    const dispatch = useDispatch()

    const { notifications, loadingNotification } = useSelector((state) => state.notification)

    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        dispatch(fetchNotification())
    }, [])

    function onRefresh() {
        setIsRefreshing(true)
        dispatch(fetchNotification())
        setIsRefreshing(false)
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.container}>
                {loadingNotification ? (
                    <SkeletonContent
                        containerStyle={{ flex: 1, width: windowWidth, marginTop: 5 }}
                        animationDirection="horizontalLeft"
                        layout={[
                            {
                                width: windowWidth,
                                height: 85,
                                marginTop: 10,
                            },
                            {
                                width: windowWidth,
                                height: 85,
                                marginTop: 10,
                            },
                            {
                                width: windowWidth,
                                height: 85,
                                marginTop: 10,
                            },
                        ]}
                        isLoading={loadingNotification}
                    />
                ) : (
                    <>
                        {notifications.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <AntDesign name={'search1'} size={40} color={'grey'} />
                                <Text stlye={styles.text}>Notifikasi mu masih kosong</Text>
                            </View>
                        ) : (
                            <>
                                {notifications.map((notification, idx) => {
                                    return (
                                        <NotificationCard
                                            notification={notification}
                                            key={'notification' + idx}
                                        />
                                    )
                                })}
                            </>
                        )}
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
    emptyContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '80%',
        marginBottom: '80%',
    },
    text: {
        marginTop: '20',
        color: 'grey',
    },
})
