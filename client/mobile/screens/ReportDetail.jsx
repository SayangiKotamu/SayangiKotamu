import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MapView, { Marker } from 'react-native-maps'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    RefreshControl,
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { fetchReportById } from '../store/reports/action'
import { upVoteReport, downVoteReport } from '../store/reports/action'

import SkeletonContent from 'react-native-skeleton-content'

import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'
import Ionicons from '@expo/vector-icons/Ionicons'

import { formatDateWithHour } from '../helpers/formatDate'

const windowWidth = Dimensions.get('window').width

export default function ReportDetail({ route }) {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    })

    const { id } = route.params

    const dispatch = useDispatch()

    const { detailReport, loadingDetailReport, loadingUpVote, loadingDownVote } = useSelector(
        (state) => state.reports
    )

    const [isRefreshing, setIsRefreshing] = useState(false)

    const [upVote, setUpVote] = useState('')
    const [downVote, setDownVote] = useState('')

    function onRefresh() {
        setIsRefreshing(true)
        dispatch(fetchReportById(id))
        setIsRefreshing(false)
    }

    function onUpVoteClick() {
        dispatch(upVoteReport(id)).then(() => {
            const newUpVote = upVote + 1
            setUpVote(newUpVote)
        })
    }

    function onDownVoteClick() {
        dispatch(downVoteReport(id)).then(() => {
            const newDownVote = downVote + 1
            setDownVote(newDownVote)
        })
    }

    useEffect(() => {
        dispatch(fetchReportById(id))
    }, [])

    useEffect(() => {
        setUpVote(detailReport.upVote)
        setDownVote(detailReport.downVote)
    }, [detailReport])

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        >
            {loadingDetailReport ? (
                <SkeletonContent
                    containerStyle={{ flex: 1, width: windowWidth, marginTop: 5 }}
                    animationDirection="horizontalLeft"
                    layout={[
                        { width: windowWidth, height: 300, marginBottom: 6 },
                        {
                            width: 350,
                            height: 20,
                            marginBottom: 6,
                            marginLeft: 30,
                            marginRight: 30,
                        },
                        { width: 350, height: 100, marginLeft: 30, marginRight: 30 },
                        {
                            width: windowWidth,
                            height: 200,
                            marginRight: 30,
                            marginTop: 10,
                        },
                        {
                            width: windowWidth,
                            height: 200,
                            marginRight: 30,
                            marginTop: 10,
                        },
                    ]}
                    isLoading={loadingDetailReport}
                />
            ) : (
                <>
                    <View style={styles.container}>
                        <Image
                            style={styles.reportImage}
                            source={{
                                uri: detailReport?.picture,
                            }}
                        />

                        <View style={styles.contentContainer}>
                            <Text style={styles.header}>{detailReport?.title}</Text>
                            <Text style={styles.small}>
                                Laporan dibuat oleh {detailReport?.user?.fullname}
                            </Text>
                            <Text style={styles.description}>{detailReport?.description}</Text>
                            <View style={styles.respondContainer}>
                                {loadingUpVote ? (
                                    <ActivityIndicator size="small" color="#1A73E9" />
                                ) : (
                                    <TouchableOpacity onPress={onUpVoteClick}>
                                        <Ionicons
                                            name={'ios-thumbs-up-outline'}
                                            size={25}
                                            color={'tomato'}
                                        />
                                    </TouchableOpacity>
                                )}
                                {loadingDownVote ? (
                                    <ActivityIndicator size="small" color="#1A73E9" />
                                ) : (
                                    <TouchableOpacity onPress={onDownVoteClick}>
                                        <Ionicons
                                            name={'ios-thumbs-down-outline'}
                                            size={25}
                                            color={'tomato'}
                                            style={styles.logo}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={styles.contentContainer}>
                            <Text style={styles.header}>Detail Laporan</Text>

                            <View style={styles.detailsContainer}>
                                <View>
                                    <View style={styles.detailDescription}>
                                        <Text style={styles.detailDescHeader}>
                                            Dinas/Instansi Terkait
                                        </Text>
                                        <Text style={styles.detailDescContent}>
                                            {detailReport?.dinas?.name}
                                        </Text>
                                    </View>
                                    <View style={styles.detailDescription}>
                                        <Text style={styles.detailDescHeader}>Dibuat pada</Text>
                                        <Text style={styles.detailDescContent}>
                                            {formatDateWithHour(detailReport?.issuedDate)}
                                        </Text>
                                    </View>
                                    <View style={styles.detailDescription}>
                                        <Text style={styles.detailDescHeader}>
                                            Kategori Permasalahan
                                        </Text>
                                        <Text style={styles.detailDescContent}>
                                            {detailReport?.category?.name}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.detailDescription}>
                                        <Text style={styles.detailDescHeader}>Status</Text>
                                        <Text style={styles.detailDescContent}>
                                            {detailReport?.status}
                                        </Text>
                                    </View>

                                    <View style={styles.detailDescription}>
                                        <Text style={styles.detailDescHeader}>Dukungan</Text>
                                        <View style={styles.respondDetailContainer}>
                                            <Ionicons
                                                name={'ios-thumbs-up-outline'}
                                                size={14}
                                                color={'tomato'}
                                            />
                                            <Text style={styles.detailDescContentVote}>
                                                {upVote}
                                            </Text>
                                            <View style={styles.separator}>
                                                <Ionicons
                                                    name={'ios-thumbs-down-outline'}
                                                    size={14}
                                                    color={'tomato'}
                                                />
                                                <Text style={styles.detailDescContentVote}>
                                                    {downVote}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={styles.contentContainer}>
                            <Text style={styles.header}>Lokasi</Text>
                        </View>
                        <MapView
                            style={styles.map}
                            region={{
                                latitude: detailReport?.lat ? detailReport?.lat : 0,
                                longitude: detailReport?.long ? detailReport?.long : 0,
                                latitudeDelta: 0.009,
                                longitudeDelta: 0.009,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: detailReport?.lat ? detailReport?.lat : 0,
                                    longitude: detailReport?.long ? detailReport?.long : 0,
                                    latitudeDelta: 0.009,
                                    longitudeDelta: 0.009,
                                }}
                            />
                        </MapView>

                        <View style={styles.contentContainerBottom}>
                            <Text style={styles.header}>Detail Lokasi</Text>

                            <Text style={styles.description}>{detailReport?.location}</Text>
                        </View>
                    </View>
                </>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
    },
    header: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
    },
    small: {
        fontSize: 10,
        color: 'grey',
    },
    description: {
        marginTop: 10,
    },
    detailDescHeader: {
        fontSize: 10,
        color: 'gray',
        fontFamily: 'Poppins_600SemiBold',
    },
    contentContainerBottom: {
        padding: 15,
        marginBottom: '30%',
    },
    detailDescContent: {
        fontSize: 13,
    },
    detailDescContentVote: {
        fontSize: 13,
        marginLeft: 4,
    },
    detailDescription: {
        marginTop: 10,
    },
    logo: {
        marginLeft: 10,
    },
    contentContainer: {
        padding: 15,
    },
    detailsContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 50,
    },
    respondContainer: {
        marginTop: 10,
        flexDirection: 'row',
    },
    respondDetailContainer: {
        flexDirection: 'row',
    },
    reportImage: {
        width: windowWidth,
        height: 300,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
    },
    separator: {
        marginLeft: 8,
        flexDirection: 'row',
    },
})
