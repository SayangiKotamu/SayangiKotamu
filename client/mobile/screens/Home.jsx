import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Home({ navigation }) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>SayangiKotamu</Text>
                <Text style={styles.paragraph}>Yuk #LiveSmart</Text>
                <View style={styles.menuContainer}>
                    <View
                        style={styles.buttonContainer}
                        onStartShouldSetResponder={() => navigation.navigate('Lapor')}
                    >
                        <Ionicons name={'list-circle'} size={30} color={'#1A73E9'} />
                        <Text>KotaReport</Text>
                    </View>
                    <View
                        style={styles.buttonContainer}
                        onStartShouldSetResponder={() => navigation.navigate('Pengumuman')}
                    >
                        <Ionicons name={'newspaper'} size={30} color={'#1A73E9'} />
                        <Text>KotaNews</Text>
                    </View>
                    <View
                        style={styles.buttonContainer}
                        onStartShouldSetResponder={() => navigation.navigate('Aspirasi')}
                    >
                        <Ionicons name={'book-sharp'} size={30} color={'#1A73E9'} />
                        <Text>KotaAspire</Text>
                    </View>
                </View>

                <View style={styles.newsContainer}>
                    <View style={styles.buttonContainer}>
                        <Button title="Logout" color="#05DAA7" />
                    </View>

                    <Text style={styles.heading}>Apa yang sedang terjadi saat ini?</Text>

                    <View style={styles.reportCardContainer}>
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
                    </View>

                    <View style={styles.reportCardContainer}>
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
                    </View>

                    <View style={styles.reportCardContainer}>
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
                    </View>

                    <View style={styles.reportCardContainer}>
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
                    </View>

                    <View style={styles.reportCardContainer}>
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
                    </View>

                    <View style={styles.reportCardContainer}>
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
                    </View>
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
        fontSize: 7,
        marginBottom: 8,
    },
    textTitle: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    textDescription: {
        fontSize: 10,
    },
    textCategory: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: 'bold',
    },
    textDate: {
        fontSize: 9,
        marginTop: 3,
    },
    reportImage: {
        width: 115,
        height: 115,
    },
    reportCardContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        width: '98%',
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
        marginTop: '10%',
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
