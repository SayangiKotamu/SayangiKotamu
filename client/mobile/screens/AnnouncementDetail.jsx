import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'

export default function AnnouncementDetail() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>Hello world from Announcement Detail</Text>
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
})
