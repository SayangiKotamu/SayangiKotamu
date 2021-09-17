import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import MapView, { Marker } from 'react-native-maps'

const windowWidth = Dimensions.get('window').width

export default function ReportDetail() {
    const [region, setRegion] = useState({
        //! Coba coba dulu
        latitude: 51.5078788,
        longitude: -0.0877321,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
    })

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={styles.reportImage}
                    source={{
                        uri: 'https://akcdn.detik.net.id/visual/2021/06/22/hari-pertama-penguatan-ppkm-mikro-jalanan-jakarta-ramai-lancar_169.jpeg?w=650',
                    }}
                />

                <View style={styles.contentContainer}>
                    <Text style={styles.header}>Terjadi kemacetan di Jl. ABC</Text>
                    <Text style={styles.small}>Laporan dibuat oleh Joko Widodo</Text>
                    <Text style={styles.description}>
                        Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet. Sudah
                        sering kali setiap saya pulang kantor macet disini, mohon untuk segera
                        ditangani secepatnya.
                    </Text>
                    <View style={styles.respondContainer}>
                        <Ionicons name={'ios-thumbs-up-outline'} size={25} color={'#1A73E9'} />
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
                                <Text style={styles.detailDescContent}>ID-XXXXX</Text>
                            </View>
                            <View style={styles.detailDescription}>
                                <Text style={styles.detailDescHeader}>Dinas/Instansi Terkait</Text>
                                <Text style={styles.detailDescContent}>Dinas Perhubungan</Text>
                            </View>
                            <View style={styles.detailDescription}>
                                <Text style={styles.detailDescHeader}>Dukungan</Text>
                                <View style={styles.respondContainer}>
                                    <Ionicons
                                        name={'ios-thumbs-up-outline'}
                                        size={15}
                                        color={'#1A73E9'}
                                    />
                                    <Text style={styles.detailDescContent}>54 orang</Text>
                                </View>
                                <View style={styles.respondContainer}>
                                    <Ionicons
                                        name={'ios-thumbs-down-outline'}
                                        size={15}
                                        color={'#1A73E9'}
                                    />
                                    <Text style={styles.detailDescContent}>3 orang</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={styles.detailDescription}>
                                <Text style={styles.detailDescHeader}>Status</Text>
                                <Text style={styles.detailDescContent}>Menunggu</Text>
                            </View>
                            <View style={styles.detailDescription}>
                                <Text style={styles.detailDescHeader}>Laporan Dibuat</Text>
                                <Text style={styles.detailDescContent}>16 September 2021</Text>
                            </View>
                            <View style={styles.detailDescription}>
                                <Text style={styles.detailDescHeader}>Kategori Permasalahan</Text>
                                <Text style={styles.detailDescContent}>Lalu Lintas</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.header}>Lokasi</Text>
                </View>
                <MapView style={styles.map} region={region}>
                    <Marker coordinate={region} />
                </MapView>
            </View>
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
        marginLeft: 10,
    },
    detailsContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
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
