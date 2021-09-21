import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'

import { AirbnbRating } from 'react-native-ratings'
import Ionicons from '@expo/vector-icons/Ionicons'

import CustomButton from '../components/CustomButton'

export default function RatingScreen() {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold,
    })

    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(5)

    function ratingCompleted(rating) {
        setRating(rating)
    }

    function onSubmitClick() {
        console.log(message, rating)
    }

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Ionicons name={'arrow-down-circle-sharp'} size={30} color={'white'} />
                <Text style={styles.headingText}>Penilaian Kinerja</Text>
                <Text style={styles.headingTextTwo}>
                    Yuk beri penilaian terhadap respon dari laporan ini!
                </Text>
            </View>

            <View style={styles.formContainer}>
                <AirbnbRating
                    count={5}
                    reviews={['Sangat Kurang', 'Kurang', 'Cukup Baik', 'Baik', 'Sangat Baik']}
                    reviewSize={20}
                    defaultRating={5}
                    size={30}
                    reviewColor={'tomato'}
                    selectedColor={'tomato'}
                    onFinishRating={ratingCompleted}
                />

                <Text style={styles.label}>Pesan yang ingin kamu sampaikan:</Text>
                <TextInput
                    style={styles.inputTextArea}
                    placeholder="tulis pesanmu disini..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={onSubmitClick}>
                        <CustomButton buttonName={'Nilai Kinerja'} buttonColor={'black'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    rating: {
        paddingVertical: 10,
    },
    headingContainer: {
        backgroundColor: 'tomato',
        borderWidth: 1,
        borderColor: '#ececec',
        width: '96%',
        padding: 3,
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 5,
        marginTop: 15,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#ececec',
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 8,
    },
    pickerText: {
        color: 'grey',
        fontFamily: 'Poppins_600SemiBold',
    },
    headingText: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
    },
    headingTextTwo: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 13,
    },
    buttonContainer: {
        marginTop: 50,
    },
    formContainer: {
        width: '80%',
        marginTop: 40,
    },
    input: {
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: 'tomato',
    },
    inputTextArea: {
        height: 50,
        borderWidth: 2,
        borderColor: 'tomato',
        padding: 8,
        borderRadius: 5,
    },
    label: {
        marginBottom: 5,
        marginTop: 20,
        fontSize: 15,
        color: 'tomato',
        fontFamily: 'Poppins_600SemiBold',
    },
    pickerContainer: {
        borderBottomWidth: 2,
        borderBottomColor: 'tomato',
        paddingBottom: 10,
    },
})
