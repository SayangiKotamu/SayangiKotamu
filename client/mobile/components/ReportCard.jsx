import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useNavigation } from '@react-navigation/native'

export default function ReportCard(props) {
    const navigation = useNavigation()

    function formatDescription(description) {
        const charLimit = 130

        if (description.length > charLimit) {
            return `${description.split('').splice(0, charLimit).join('')}...`
        } else {
            return description
        }
    }

    return (
        <TouchableOpacity
            style={styles.reportCardContainer}
            onPress={() => navigation.navigate('Detail Laporan', { id: props.report.id })}
        >
            <View>
                <Image
                    style={styles.reportImage}
                    source={{
                        uri: props.report.picture,
                    }}
                />
            </View>
            <View style={styles.reportCardContent}>
                <Text style={styles.textId}>{props.report.id}</Text>
                <Text style={styles.textTitle}>{props.report.title}</Text>
                <Text style={styles.textDescription}>
                    {formatDescription(props.report.description)}
                </Text>
                <Text style={styles.textCategory}>{props.report.category}</Text>
                <Text style={styles.textDate}>
                    Laporan dibuat pada {props.report.issued_date.split('T')[0]} oleh{' '}
                    {props.report.user.full_name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
})
