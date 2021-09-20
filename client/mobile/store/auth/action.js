import {
    SET_IS_LOGGED_IN,
    SET_ACCESS_TOKEN,
    SET_LOADING_LOGIN,
    SET_LOADING_REGISTER,
    SET_FAIL_LOGIN,
    SET_FAIL_REGISTER,
} from './actionType'

import Toast from 'react-native-toast-message'

import baseURL from '../../apis/sayangiKotamu'
import sayangiKotamuApi from '../../apis/sayangiKotamuAxios'

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

function setLoadingRegister(payload) {
    return {
        type: SET_LOADING_REGISTER,
        payload,
    }
}

export function doRegister(payload) {
    return async function (dispatch) {
        try {
            dispatch(setLoadingRegister(true))

            await sayangiKotamuApi({
                method: 'POST',
                url: '/register',
                data: {
                    NIK: payload.NIK,
                    fullname: payload.fullName,
                    email: payload.email,
                    password: payload.password,
                    kota: payload.kota,
                    // ktp: payload.ktp, //! Ini link ktp dari firebase. Belum ada di server
                },
            })

            Toast.show({
                type: 'success',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Berhasil register! Sebelum login, silahkan aktivasi akun mu dengan akun yang terdaftar',
            })
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: err.response.data.message,
            })
        } finally {
            dispatch(setLoadingRegister(false))
        }
    }
}

export function doLogin(payload) {
    return async function (dispatch) {
        try {
            dispatch(setLoadingLogin(true))

            let response = await fetch(`${baseURL}/login`, {
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
