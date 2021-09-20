import { SET_NOTIFICATION, SET_LOADING_NOTIFICATION } from './actionType'

import Toast from 'react-native-toast-message'

import baseURL from '../../apis/sayangiKotamu'

import sayangiKotamuApi from '../../apis/sayangiKotamuAxios'

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
    return async function (dispatch, getState) {
        try {
            const { auth } = getState()

            dispatch(setLoadingNotification(true))

            let response = await sayangiKotamuApi({
                method: 'GET',
                url: '/notifications',
                headers: {
                    access_token: auth.accessToken,
                },
            })

            dispatch(setNotifications(response.data))
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: err.response.data.message,
            })
        } finally {
            dispatch(setLoadingNotification(false))
        }
    }
}
