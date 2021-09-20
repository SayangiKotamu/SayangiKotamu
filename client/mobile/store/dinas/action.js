import { SET_DINAS, SET_LOADING_DINAS } from './actionType'

import Toast from 'react-native-toast-message'

import baseURL from '../../apis/sayangiKotamu'
import sayangiKotamuApi from '../../apis/sayangiKotamuAxios'

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

            let response = await sayangiKotamuApi({
                method: 'GET',
                url: '/dinas',
            })

            console.log(response.data, '<< all dinas data')

            // dispatch(setDinas(response))
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
