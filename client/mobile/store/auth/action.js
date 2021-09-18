import { SET_IS_LOGGED_IN, SET_ACCESS_TOKEN, SET_LOADING_LOGIN } from './actionType'

import Toast from 'react-native-toast-message'

export function setIsLoggedIn(payload) {
    return {
        type: SET_IS_LOGGED_IN,
        payload,
    }
}

export function setAccessToken(payload) {
    return {
        type: SET_ACCESS_TOKEN,
        payload,
    }
}

function setLoadingLogin(payload) {
    return {
        type: SET_LOADING_LOGIN,
        payload,
    }
}

export function doLogin(payload) {
    return async function (dispatch) {
        try {
            dispatch(setLoadingLogin(true))

            let response = await fetch('https://d9f8-110-138-92-119.ngrok.io/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                }),
            })

            if (response.ok) {
                response = await response.json()

                dispatch(setIsLoggedIn(true))
                dispatch(setAccessToken(response.accessToken))

                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    bottomOffset: 70,
                    text1: 'SayangiKotamu',
                    text2: 'Berhasil login!',
                })
            } else {
                throw Error
            }
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Maaf, login tidak berhasil',
            })
        } finally {
            dispatch(setLoadingLogin(false))
        }
    }
}
