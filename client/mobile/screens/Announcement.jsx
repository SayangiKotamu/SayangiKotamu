import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Announcement({ navigation }) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.announcementCardContainer}
                    onPress={() => navigation.navigate('Detail Pengumuman')}
                >
                    <View style={styles.notificationLogo}>
                        <Ionicons name={'information-circle-sharp'} size={30} color={'#1A73E9'} />
                    </View>
                    <View style={styles.announcementCardContent}>
                        <Text style={styles.textTitle}>Pengalihan Jalan</Text>
                        <Text style={styles.textInstances}>Dinas Perhubungan</Text>
                        <Text style={styles.textDate}>
                            Pengumuman dibuat pada 16 September 2021
                        </Text>
                        <Text style={styles.textDescription}>
                            Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.announcementCardContainer}
                    onPress={() => navigation.navigate('Detail Pengumuman')}
                >
                    <View style={styles.notificationLogo}>
                        <Ionicons name={'information-circle-sharp'} size={30} color={'#1A73E9'} />
                    </View>
                    <View style={styles.announcementCardContent}>
                        <Text style={styles.textTitle}>Pengalihan Jalan</Text>
                        <Text style={styles.textInstances}>Dinas Perhubungan</Text>
                        <Text style={styles.textDate}>
                            Pengumuman dibuat pada 16 September 2021
                        </Text>
                        <Text style={styles.textDescription}>
                            Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.announcementCardContainer}
                    onPress={() => navigation.navigate('Detail Pengumuman')}
                >
                    <View style={styles.notificationLogo}>
                        <Ionicons name={'information-circle-sharp'} size={30} color={'#1A73E9'} />
                    </View>
                    <View style={styles.announcementCardContent}>
                        <Text style={styles.textTitle}>Pengalihan Jalan</Text>
                        <Text style={styles.textInstances}>Dinas Perhubungan</Text>
                        <Text style={styles.textDate}>
                            Pengumuman dibuat pada 16 September 2021
                        </Text>
                        <Text style={styles.textDescription}>
                            Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.announcementCardContainer}
                    onPress={() => navigation.navigate('Detail Pengumuman')}
                >
                    <View style={styles.notificationLogo}>
                        <Ionicons name={'information-circle-sharp'} size={30} color={'#1A73E9'} />
                    </View>
                    <View style={styles.announcementCardContent}>
                        <Text style={styles.textTitle}>Pengalihan Jalan</Text>
                        <Text style={styles.textInstances}>Dinas Perhubungan</Text>
                        <Text style={styles.textDate}>
                            Pengumuman dibuat pada 16 September 2021
                        </Text>
                        <Text style={styles.textDescription}>
                            Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.announcementCardContainer}
                    onPress={() => navigation.navigate('Detail Pengumuman')}
                >
                    <View style={styles.notificationLogo}>
                        <Ionicons name={'information-circle-sharp'} size={30} color={'#1A73E9'} />
                    </View>
                    <View style={styles.announcementCardContent}>
                        <Text style={styles.textTitle}>Pengalihan Jalan</Text>
                        <Text style={styles.textInstances}>Dinas Perhubungan</Text>
                        <Text style={styles.textDate}>
                            Pengumuman dibuat pada 16 September 2021
                        </Text>
                        <Text style={styles.textDescription}>
                            Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.announcementCardContainer}
                    onPress={() => navigation.navigate('Detail Pengumuman')}
                >
                    <View style={styles.notificationLogo}>
                        <Ionicons name={'information-circle-sharp'} size={30} color={'#1A73E9'} />
                    </View>
                    <View style={styles.announcementCardContent}>
                        <Text style={styles.textTitle}>Pengalihan Jalan</Text>
                        <Text style={styles.textInstances}>Dinas Perhubungan</Text>
                        <Text style={styles.textDate}>
                            Pengumuman dibuat pada 16 September 2021
                        </Text>
                        <Text style={styles.textDescription}>
                            Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.announcementCardContainer}
                    onPress={() => navigation.navigate('Detail Pengumuman')}
                >
                    <View style={styles.notificationLogo}>
                        <Ionicons name={'information-circle-sharp'} size={30} color={'#1A73E9'} />
                    </View>
                    <View style={styles.announcementCardContent}>
                        <Text style={styles.textTitle}>Pengalihan Jalan</Text>
                        <Text style={styles.textInstances}>Dinas Perhubungan</Text>
                        <Text style={styles.textDate}>
                            Pengumuman dibuat pada 16 September 2021
                        </Text>
                        <Text style={styles.textDescription}>
                            Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.announcementCardContainer}
                    onPress={() => navigation.navigate('Detail Pengumuman')}
                >
                    <View style={styles.notificationLogo}>
                        <Ionicons name={'information-circle-sharp'} size={30} color={'#1A73E9'} />
                    </View>
                    <View style={styles.announcementCardContent}>
                        <Text style={styles.textTitle}>Pengalihan Jalan</Text>
                        <Text style={styles.textInstances}>Dinas Perhubungan</Text>
                        <Text style={styles.textDate}>
                            Pengumuman dibuat pada 16 September 2021
                        </Text>
                        <Text style={styles.textDescription}>
                            Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.announcementCardContainer}
                    onPress={() => navigation.navigate('Detail Pengumuman')}
                >
                    <View style={styles.notificationLogo}>
                        <Ionicons name={'information-circle-sharp'} size={30} color={'#1A73E9'} />
                    </View>
                    <View style={styles.announcementCardContent}>
                        <Text style={styles.textTitle}>Pengalihan Jalan</Text>
                        <Text style={styles.textInstances}>Dinas Perhubungan</Text>
                        <Text style={styles.textDate}>
                            Pengumuman dibuat pada 16 September 2021
                        </Text>
                        <Text style={styles.textDescription}>
                            Halo Pak Dinas Perhubungan, mohon dibantu ini sudah 5 jam macet...
                        </Text>
                    </View>
                </TouchableOpacity>
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
    announcementCardContainer: {
        backgroundColor: 'white',
        borderColor: 'grey',
        marginTop: 8,
        borderWidth: 1,
        borderRadius: 5,
        paddingBottom: 5,
        width: '100%',
        flexDirection: 'row',
    },
    announcementCardContent: {
        marginLeft: 10,
        padding: 3,
        width: '100%',
        flexGrow: 1,
        flex: 1,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textDescription: {
        fontSize: 12,
        marginTop: 10,
        color: 'black',
    },
    textDate: {
        fontSize: 11,
        marginTop: 1,
        color: 'grey',
    },
    textInstances: {
        fontSize: 13,
    },
    heading: {
        fontSize: 18,
        marginTop: '1%',
        color: '#1A73E9',
        fontWeight: 'bold',
    },
})
