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

import MapView, { Marker } from 'react-native-maps'

import { useIsFocused } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'
import { fetchReportById } from '../store/reports/action'

import SkeletonContent from 'react-native-skeleton-content'

const windowWidth = Dimensions.get('window').width

export default function ReportDetail({ route }) {
    const { id } = route.params

    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    const { detailReport, loadingDetailReport } = useSelector((state) => state.reports)

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
                                Laporan dibuat oleh {detailReport?.user?.full_name}
                            </Text>
                            <Text style={styles.description}>{detailReport?.description}</Text>
                            <View style={styles.respondContainer}>
                                <Ionicons
                                    name={'ios-thumbs-up-outline'}
                                    size={25}
                                    color={'#1A73E9'}
                                />
                                <Ionicons
                                    name={'ios-thumbs-down-outline'}
                                    size={25}
                                    color={'#1A73E9'}
                                    style={styles.logo}
                                />
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
                                            {detailReport?.id}
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
                                                size={15}
                                                color={'#1A73E9'}
                                            />
                                            <Text style={styles.detailDescContent}>
                                                {detailReport?.upVote} orang
                                            </Text>
                                        </View>
                                        <View style={styles.respondContainer}>
                                            <Ionicons
                                                name={'ios-thumbs-down-outline'}
                                                size={15}
                                                color={'#1A73E9'}
                                            />
                                            <Text style={styles.detailDescContent}>
                                                {detailReport?.downVote} orang
                                            </Text>
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
                                            {detailReport?.issued_date?.split('T')[0]}
                                        </Text>
                                    </View>
                                    <View style={styles.detailDescription}>
                                        <Text style={styles.detailDescHeader}>
                                            Kategori Permasalahan
                                        </Text>
                                        <Text style={styles.detailDescContent}>
                                            {detailReport?.category}
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
                                latitude: detailReport?.lat?.$numberDecimal
                                    ? Number(detailReport.lat.$numberDecimal)
                                    : 0,
                                longitude: detailReport?.long?.$numberDecimal
                                    ? Number(detailReport.long.$numberDecimal)
                                    : 0,
                                latitudeDelta: 0.009,
                                longitudeDelta: 0.009,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: detailReport?.lat?.$numberDecimal
                                        ? Number(detailReport.lat.$numberDecimal)
                                        : 0,
                                    longitude: detailReport?.long?.$numberDecimal
                                        ? Number(detailReport.long.$numberDecimal)
                                        : 0,
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
})
