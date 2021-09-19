import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { useNavigation } from '@react-navigation/native'

import formatCharactersByLimit from '../helpers/formatCharactersByLimit'

export default function ReportCard(props) {
    const navigation = useNavigation()
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
                    {formatCharactersByLimit(props.report.description)}
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
        color: '#a2a4aa',
    },
    textTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#062158',
    },
    textDescription: {
        fontSize: 12,
        color: '#737375',
    },
    textCategory: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#062158',
    },
    textDate: {
        fontSize: 10,
        marginTop: 3,
        color: '#737375',
    },
    reportImage: {
        width: 130,
        height: 130,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    reportCardContainer: {
        backgroundColor: 'white',
        borderColor: '#ececec',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        width: '95%',
        flexDirection: 'row',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#ececec',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 2,
    },
    reportCardContent: {
        marginLeft: 10,
        padding: 3,
        width: '100%',
        flexGrow: 1,
        flex: 1,
    },
})
