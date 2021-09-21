import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function CustomButton(props) {
    return (
        <View style={[styles.button, { backgroundColor: props.buttonColor }]}>
            <Text style={styles.buttonText}>{props.buttonName}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        padding: 5,
        borderRadius: 15,
        height: 50,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
        color: 'white',
    },
})
