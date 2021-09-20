import { SET_NOTIFICATION, SET_LOADING_NOTIFICATION } from './actionType'

import Toast from 'react-native-toast-message'

import baseURL from '../../apis/sayangiKotamu'

function setNotifications(payload) {
    return {
        type: SET_NOTIFICATION,
        payload,
    }
}

function setLoadingNotification(payload) {
    return {
        type: SET_LOADING_NOTIFICATION,
        payload,
    }
}

export function fetchNotification(payload) {
    return async function (dispatch) {
        try {
            dispatch(setLoadingNotification(true))

            let response = await fetch(`${baseURL}/notifications`)

            if (response.ok) {
                response = await response.json()

                dispatch(setNotifications(response))
            } else {
                throw Error
            }
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Maaf, data notifikasi sedang tidak bisa diakses',
            })
        } finally {
            dispatch(setLoadingNotification(false))
        }
    }
}
