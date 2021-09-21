import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, RefreshControl } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllReports, fetchReportByCategory } from '../store/reports/action'
import { fetchAllCategory } from '../store/categories/action'

import ReportCard from '../components/ReportCard'

import SkeletonContent from 'react-native-skeleton-content'

import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'

const windowWidth = Dimensions.get('window').width

export default function Home({ navigation }) {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    })

    const dispatch = useDispatch()

    const { reports, loadingReports } = useSelector((state) => state.reports)
    const { categories } = useSelector((state) => state.categories)

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')

    function onRefresh() {
        setIsRefreshing(true)
        dispatch(fetchAllReports())
        dispatch(fetchAllCategory())
        setIsRefreshing(false)
    }

    useEffect(() => {
        //! No need to fetchallreport here
        dispatch(fetchAllCategory())
    }, [])

    useEffect(() => {
        if (!selectedCategory) {
            dispatch(fetchAllReports()) //! Already handled here
        } else {
            dispatch(fetchReportByCategory(selectedCategory))
        }
    }, [selectedCategory])

    if (!fontsLoaded) {
        return <AppLoading />
    }

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
                            <AntDesign name={'customerservice'} size={37} color={'white'} />
                            <Text style={styles.textColor}>KotaReport</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.innerMenu}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => navigation.navigate('Pengumuman')}
                        >
                            <AntDesign name={'filetext1'} size={37} color={'white'} />
                            <Text style={styles.textColor}>KotaNews</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.innerMenu}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => navigation.navigate('Aspirasi')}
                        >
                            <AntDesign name={'carryout'} size={37} color={'white'} />
                            <Text style={styles.textColor}>KotaAspiration</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.newsContainer}>
                    <View style={styles.headingSection}>
                        <Text style={styles.heading}>Apa kabar kota mu hari ini?</Text>
                        {categories.length > 0 && (
                            <>
                                <AntDesign
                                    name={'filter'}
                                    size={20}
                                    color={'grey'}
                                    style={styles.filterIcon}
                                />
                                <Picker
                                    selectedValue={selectedCategory}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedCategory(itemValue)
                                    }
                                    style={styles.pickerCategory}
                                >
                                    <Picker.Item label={'Semua Kategori'} value={''} />
                                    {categories.map((category, idx) => {
                                        return (
                                            <Picker.Item
                                                label={category.name}
                                                value={category._id}
                                                key={'category' + idx}
                                            />
                                        )
                                    })}
                                </Picker>
                            </>
                        )}
                    </View>

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
                                {reports.length > 0 ? (
                                    <>
                                        {reports.map((report, idx) => {
                                            return (
                                                <ReportCard report={report} key={'report' + idx} />
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.emptyReport}>Tidak ada laporan</Text>
                                    </>
                                )}
                            </>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    emptyReport: {
        color: 'grey',
        fontFamily: 'Poppins_600SemiBold',
    },
    textColor: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'Poppins_600SemiBold',
    },
    title: {
        fontSize: 25,
        marginTop: '5%',
        color: '#1A73E9',
        fontWeight: 'bold',
        fontFamily: 'Poppins_600SemiBold',
    },
    filterIcon: {
        marginLeft: 10,
        marginTop: 5,
    },
    loading: {
        marginTop: '40%',
        marginBottom: '40%',
    },
    buttonContainer: {
        marginTop: 50,
    },
    pickerCategory: {
        width: '10%',
    },
    headingSection: {
        flexDirection: 'row',
    },
    innerMenu: {
        borderWidth: 1,
        borderColor: '#ececec',
        backgroundColor: 'tomato',
        padding: 5,
        borderRadius: 30,
        height: 110,
        width: '35%',
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
        fontSize: 18,
        marginTop: '1%',
        color: 'black',
        textAlign: 'left',
        marginLeft: '3%',
        fontFamily: 'Poppins_600SemiBold',
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
        marginBottom: '80%',
    },
    menuContainer: {
        marginTop: '5%',
        flexDirection: 'row',
        padding: 5,
        borderRadius: 10,
        width: '90%',
        justifyContent: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})
