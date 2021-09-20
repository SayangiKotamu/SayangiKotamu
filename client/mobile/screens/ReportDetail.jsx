import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    ActivityIndicator,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import { TouchableOpacity } from 'react-native-gesture-handler'

import MapView, { Marker } from 'react-native-maps'

import { useIsFocused } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'
import { fetchReportById } from '../store/reports/action'

import SkeletonContent from 'react-native-skeleton-content'

import Toast from 'react-native-toast-message'

const windowWidth = Dimensions.get('window').width

export default function ReportDetail({ route }) {
    const { id } = route.params

    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    const { detailReport, loadingDetailReport } = useSelector((state) => state.reports)

    function upVoteReport() {
        Toast.show({
            type: 'success',
            position: 'bottom',
            bottomOffset: 70,
            text1: 'SayangiKotamu',
            text2: 'Berhasil mendukung laporan ini',
        })
    }

    function downVoteReport() {
        Toast.show({
            type: 'success',
            position: 'bottom',
            bottomOffset: 70,
            text1: 'SayangiKotamu',
            text2: 'Berhasil melaporkan laporan ini',
        })
    }

    useEffect(() => {
        if (isFocused) {
            dispatch(fetchReportById(id))
        }
    }, [isFocused])

    return (
        <ScrollView>
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
                                <TouchableOpacity onPress={upVoteReport}>
                                    <Ionicons
                                        name={'ios-thumbs-up-outline'}
                                        size={25}
                                        color={'#1A73E9'}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={downVoteReport}>
                                    <Ionicons
                                        name={'ios-thumbs-down-outline'}
                                        size={25}
                                        color={'#1A73E9'}
                                        style={styles.logo}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={styles.contentContainer}>
                            <Text style={styles.header}>Detail Laporan</Text>

                            <View style={styles.detailsContainer}>
                                <View>
                                    <View style={styles.detailDescription}>
                                        <Text style={styles.detailDescHeader}>Nomor Laporan</Text>
                                        <Text style={styles.detailDescContent}>
                                            {detailReport?._id}
                                        </Text>
                                    </View>
                                    <View style={styles.detailDescription}>
                                        <Text style={styles.detailDescHeader}>
                                            Dinas/Instansi Terkait
                                        </Text>
                                        <Text style={styles.detailDescContent}>
                                            {detailReport?.dinas?.name}
                                        </Text>
                                    </View>
                                    <View style={styles.detailDescription}>
                                        <Text style={styles.detailDescHeader}>Dukungan</Text>
                                        <View style={styles.respondContainer}>
                                            <Ionicons
                                                name={'ios-thumbs-up-outline'}
                                                size={14}
                                                color={'#1A73E9'}
                                            />
                                            <Text style={styles.detailDescContentVote}>
                                                {detailReport?.upVote}
                                            </Text>
                                            <View style={styles.separator}>
                                                <Ionicons
                                                    name={'ios-thumbs-down-outline'}
                                                    size={14}
                                                    color={'#1A73E9'}
                                                />
                                                <Text style={styles.detailDescContentVote}>
                                                    {detailReport?.downVote}
                                                </Text>
                                            </View>
                                        </View>
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
                                        <Text style={styles.detailDescHeader}>Laporan Dibuat</Text>
                                        <Text style={styles.detailDescContent}>
                                            {detailReport?.issuedDate?.split('T')[0]}
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
        fontWeight: 'bold',
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
        marginRight: 30,
    },
    respondContainer: {
        marginTop: 10,
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
