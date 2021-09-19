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

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.brandingContainer}>
                <Image
                    style={styles.logoImage}
                    source={{
                        uri: 'https://i.imgur.com/GKQ7zUt.jpeg',
                    }}
                />
            </View>

            <View style={styles.container}>
                <View style={styles.menuContainer}>
                    <View style={styles.innerMenu}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => navigation.navigate('Lapor')}
                        >
                            <Ionicons name={'list-circle'} size={30} color={'#1A73E9'} />
                            <Text style={styles.textColor}>KotaReport</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.innerMenu}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => navigation.navigate('Pengumuman')}
                        >
                            <Ionicons name={'newspaper'} size={30} color={'#1A73E9'} />
                            <Text style={styles.textColor}>KotaNews</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.innerMenu}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => navigation.navigate('Aspirasi')}
                        >
                            <Ionicons name={'book-sharp'} size={30} color={'#1A73E9'} />
                            <Text style={styles.textColor}>KotaAspire</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.newsContainer}>
                    <Text style={styles.heading}>Apa kabar kota mu hari ini?</Text>

                    <View style={styles.newsCardContainer}>
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
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textColor: {
        color: '#a2a4aa',
    },
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
    innerMenu: {
        borderWidth: 1,
        borderColor: '#ececec',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
        height: 90,
        width: 90,
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#ececec',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    paragraph: {
        fontSize: 13,
        color: 'grey',
    },
    heading: {
        fontSize: 20,
        marginTop: '1%',
        color: '#062158',
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: '3%',
    },
    logoImage: {
        width: 250,
        height: 250,
    },
    brandingContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    container: {
        flex: 1,
        backgroundColor: '#f2f3f7',
        alignItems: 'center',
    },
    newsContainer: {
        flex: 1,
        marginTop: '5%',
        width: '100%',
    },
    newsCardContainer: {
        flex: 1,
        marginTop: '4%',
        width: '100%',
        alignItems: 'center',
    },
    menuContainer: {
        marginTop: '5%',
        flexDirection: 'row',
        padding: 5,
        borderRadius: 10,
        width: '80%',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
