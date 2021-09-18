import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Button,
    Dimensions,
    RefreshControl,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Toast from 'react-native-toast-message'

import { setIsLoggedIn, setAccessToken } from '../store/auth/action'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllReports } from '../store/reports/action'

import ReportCard from '../components/ReportCard'

import SkeletonContent from 'react-native-skeleton-content'

const windowWidth = Dimensions.get('window').width

export default function Home({ navigation }) {
    const dispatch = useDispatch()

    const { reports, loadingReports } = useSelector((state) => state.reports)

    const [isRefreshing, setIsRefreshing] = useState(false)

    function onRefresh() {
        setIsRefreshing(true)
        dispatch(fetchAllReports())
        setIsRefreshing(false)
    }

    useEffect(() => {
        dispatch(fetchAllReports())
    }, [])

    function onLogoutClick() {
        dispatch(setIsLoggedIn(false))
        dispatch(setAccessToken(''))

        Toast.show({
            type: 'success',
            position: 'bottom',
            bottomOffset: 70,
            text1: 'SayangiKotamu',
            text2: 'Berhasil logout dari SayangiKotamu',
        })
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.container}>
                <View style={styles.brandingContainer}>
                    <Image
                        style={styles.logoImage}
                        source={{
                            uri: 'https://i.imgur.com/GKQ7zUt.jpeg',
                        }}
                    />
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => navigation.navigate('Lapor')}
                    >
                        <Ionicons name={'list-circle'} size={30} color={'#1A73E9'} />
                        <Text>KotaReport</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => navigation.navigate('Pengumuman')}
                    >
                        <Ionicons name={'newspaper'} size={30} color={'#1A73E9'} />
                        <Text>KotaNews</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => navigation.navigate('Aspirasi')}
                    >
                        <Ionicons name={'book-sharp'} size={30} color={'#1A73E9'} />
                        <Text>KotaAspire</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.newsContainer}>
                    <View style={styles.buttonContainer}>
                        <Button title="Logout" color="#05DAA7" onPress={onLogoutClick} />
                    </View>

                    <Text style={styles.heading}>Apa kabar kota hari ini?</Text>

                    {loadingReports ? (
                        <SkeletonContent
                            containerStyle={{ flex: 1, width: windowWidth, marginTop: 5 }}
                            animationDirection="horizontalLeft"
                            layout={[
                                {
                                    width: windowWidth,
                                    height: 120,
                                    marginTop: 10,
                                },
                                {
                                    width: windowWidth,
                                    height: 120,
                                    marginTop: 10,
                                },
                                {
                                    width: windowWidth,
                                    height: 120,
                                    marginTop: 10,
                                },
                            ]}
                            isLoading={loadingReports}
                        />
                    ) : (
                        <>
                            {reports.map((report, idx) => {
                                return <ReportCard report={report} key={'report' + idx} />
                            })}
                        </>
                    )}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        marginTop: '5%',
        color: '#1A73E9',
        fontWeight: 'bold',
    },
    loading: {
        marginTop: '40%',
        marginBottom: '40%',
    },
    buttonContainer: {
        marginTop: 50,
    },
    paragraph: {
        fontSize: 13,
        color: 'grey',
    },
    heading: {
        fontSize: 12,
        marginTop: '1%',
        color: '#1A73E9',
        fontWeight: 'bold',
    },
    logoImage: {
        width: 250,
        height: 250,
    },
    brandingContainer: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    newsContainer: {
        flex: 1,
        marginTop: '5%',
        backgroundColor: '#fafafa',
        alignItems: 'center',
        width: '100%',
    },
    menuContainer: {
        marginTop: '5%',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        borderRadius: 10,
        width: '70%',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
