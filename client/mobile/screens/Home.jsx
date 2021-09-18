import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { setIsLoggedIn, setAccessToken } from '../store/auth/action'
import { useDispatch } from 'react-redux'

export default function Home({ navigation }) {
    const dispatch = useDispatch()

    function onLogoutClick() {
        dispatch(setIsLoggedIn(false))
        dispatch(setAccessToken(''))
    }

    return (
        <ScrollView>
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

                    <TouchableOpacity
                        style={styles.reportCardContainer}
                        onPress={() => navigation.navigate('Detail Laporan')}
                    >
                        <View style={styles.reportCardImage}>
                            <Image
                                style={styles.reportImage}
                                source={{
                                    uri: 'https://akcdn.detik.net.id/visual/2021/06/22/hari-pertama-penguatan-ppkm-mikro-jalanan-jakarta-ramai-lancar_169.jpeg?w=650',
                                }}
                            />
                        </View>
                        <View style={styles.reportCardContent}>
                            <Text style={styles.textId}>ID-XXXXXX</Text>
                            <Text style={styles.textTitle}>Terjadi kemacetan di Jl. ABC</Text>
                            <Text style={styles.textDescription}>
                                Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                            </Text>
                            <Text style={styles.textCategory}>Lalu Lintas</Text>
                            <Text style={styles.textDate}>
                                Laporan dibuat pada 16 September 2021 oleh Joko Widodo
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.reportCardContainer}
                        onPress={() => navigation.navigate('Detail Laporan')}
                    >
                        <View style={styles.reportCardImage}>
                            <Image
                                style={styles.reportImage}
                                source={{
                                    uri: 'https://akcdn.detik.net.id/visual/2021/06/22/hari-pertama-penguatan-ppkm-mikro-jalanan-jakarta-ramai-lancar_169.jpeg?w=650',
                                }}
                            />
                        </View>
                        <View style={styles.reportCardContent}>
                            <Text style={styles.textId}>ID-XXXXXX</Text>
                            <Text style={styles.textTitle}>Terjadi kemacetan di Jl. ABC</Text>
                            <Text style={styles.textDescription}>
                                Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                            </Text>
                            <Text style={styles.textCategory}>Lalu Lintas</Text>
                            <Text style={styles.textDate}>
                                Laporan dibuat pada 16 September 2021 oleh Joko Widodo
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.reportCardContainer}
                        onPress={() => navigation.navigate('Detail Laporan')}
                    >
                        <View style={styles.reportCardImage}>
                            <Image
                                style={styles.reportImage}
                                source={{
                                    uri: 'https://akcdn.detik.net.id/visual/2021/06/22/hari-pertama-penguatan-ppkm-mikro-jalanan-jakarta-ramai-lancar_169.jpeg?w=650',
                                }}
                            />
                        </View>
                        <View style={styles.reportCardContent}>
                            <Text style={styles.textId}>ID-XXXXXX</Text>
                            <Text style={styles.textTitle}>Terjadi kemacetan di Jl. ABC</Text>
                            <Text style={styles.textDescription}>
                                Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                            </Text>
                            <Text style={styles.textCategory}>Lalu Lintas</Text>
                            <Text style={styles.textDate}>
                                Laporan dibuat pada 16 September 2021 oleh Joko Widodo
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.reportCardContainer}
                        onPress={() => navigation.navigate('Detail Laporan')}
                    >
                        <View style={styles.reportCardImage}>
                            <Image
                                style={styles.reportImage}
                                source={{
                                    uri: 'https://akcdn.detik.net.id/visual/2021/06/22/hari-pertama-penguatan-ppkm-mikro-jalanan-jakarta-ramai-lancar_169.jpeg?w=650',
                                }}
                            />
                        </View>
                        <View style={styles.reportCardContent}>
                            <Text style={styles.textId}>ID-XXXXXX</Text>
                            <Text style={styles.textTitle}>Terjadi kemacetan di Jl. ABC</Text>
                            <Text style={styles.textDescription}>
                                Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                            </Text>
                            <Text style={styles.textCategory}>Lalu Lintas</Text>
                            <Text style={styles.textDate}>
                                Laporan dibuat pada 16 September 2021 oleh Joko Widodo
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.reportCardContainer}
                        onPress={() => navigation.navigate('Detail Laporan')}
                    >
                        <View style={styles.reportCardImage}>
                            <Image
                                style={styles.reportImage}
                                source={{
                                    uri: 'https://akcdn.detik.net.id/visual/2021/06/22/hari-pertama-penguatan-ppkm-mikro-jalanan-jakarta-ramai-lancar_169.jpeg?w=650',
                                }}
                            />
                        </View>
                        <View style={styles.reportCardContent}>
                            <Text style={styles.textId}>ID-XXXXXX</Text>
                            <Text style={styles.textTitle}>Terjadi kemacetan di Jl. ABC</Text>
                            <Text style={styles.textDescription}>
                                Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                            </Text>
                            <Text style={styles.textCategory}>Lalu Lintas</Text>
                            <Text style={styles.textDate}>
                                Laporan dibuat pada 16 September 2021 oleh Joko Widodo
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.reportCardContainer}
                        onPress={() => navigation.navigate('Detail Laporan')}
                    >
                        <View style={styles.reportCardImage}>
                            <Image
                                style={styles.reportImage}
                                source={{
                                    uri: 'https://akcdn.detik.net.id/visual/2021/06/22/hari-pertama-penguatan-ppkm-mikro-jalanan-jakarta-ramai-lancar_169.jpeg?w=650',
                                }}
                            />
                        </View>
                        <View style={styles.reportCardContent}>
                            <Text style={styles.textId}>ID-XXXXXX</Text>
                            <Text style={styles.textTitle}>Terjadi kemacetan di Jl. ABC</Text>
                            <Text style={styles.textDescription}>
                                Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                            </Text>
                            <Text style={styles.textCategory}>Lalu Lintas</Text>
                            <Text style={styles.textDate}>
                                Laporan dibuat pada 16 September 2021 oleh Joko Widodo
                            </Text>
                        </View>
                    </TouchableOpacity>
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
    textId: {
        fontSize: 8,
        marginBottom: 8,
    },
    textTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    textDescription: {
        fontSize: 12,
    },
    textCategory: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
    },
    textDate: {
        fontSize: 10,
        marginTop: 3,
    },
    reportImage: {
        width: 130,
        height: 130,
    },
    logoImage: {
        width: 250,
        height: 250,
    },
    brandingContainer: {
        flexDirection: 'row',
    },
    reportCardContainer: {
        backgroundColor: 'white',
        borderColor: 'grey',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        flexDirection: 'row',
    },
    reportCardContent: {
        marginLeft: 10,
        padding: 3,
        width: '100%',
        flexGrow: 1,
        flex: 1,
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
