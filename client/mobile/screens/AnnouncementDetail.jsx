import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function AnnouncementDetail() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.announcementCardContainer}>
                    <View>
                        <Ionicons name={'information-circle-sharp'} size={30} color={'#1A73E9'} />
                    </View>
                    <View style={styles.announcementCardContent}>
                        <Text style={styles.textTitle}>Pengalihan Jalan</Text>
                        <Text style={styles.textOrganization}>Dinas Perhubungan</Text>
                        <Text style={styles.textDate}>
                            Pengumuman dibuat pada 12 September 2021
                        </Text>

                        <Text style={styles.textDescription}>
                            Diumumkan untuk warga yang tinggal di sekitar daerah Lorem Ipsum, bahwa
                            pada hari Senin s.d. Rabu, Jl. ABC akan dialihkan ke JL. XYZ. Selain
                            itu, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                            in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                            qui officia deserunt mollit anim id est laborum.
                        </Text>
                    </View>
                </View>
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
        borderColor: 'black',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        width: '98%',
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
        fontSize: 19,
        fontWeight: 'bold',
    },
    textOrganization: {
        backgroundColor: '#05DAA7',
        width: '70%',
        padding: 2,
        borderRadius: 10,
        marginLeft: 2,
        color: 'white',
        fontWeight: 'bold',
    },
    textDescription: {
        fontSize: 15,
        marginTop: 20,
        marginBottom: 30,
    },
    textDate: {
        fontSize: 12,
    },
})
