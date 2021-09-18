import { SET_DINAS, SET_LOADING_DINAS } from './actionType'

import Toast from 'react-native-toast-message'

function setDinas(payload) {
    return {
        type: SET_DINAS,
        payload,
    }
}

function setLoadingDinas(payload) {
    return {
        type: SET_LOADING_DINAS,
        payload,
    }
}

export function fetchAllDinas() {
    return async function (dispatch) {
        try {
            dispatch(setLoadingDinas(true))

            let response = await fetch('https://d505-110-138-92-119.ngrok.io/dinas')

            if (response.ok) {
                response = await response.json()

                dispatch(setDinas(response))
            } else {
                throw Error
            }
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Maaf, data dinas sedang tidak bisa diakses',
            })
        } finally {
            dispatch(setLoadingDinas(false))
        }
    }
}
