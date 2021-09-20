import { SET_CATEGORIES, SET_LOADING_CATEGORIES } from './actionType'

import Toast from 'react-native-toast-message'

import sayangiKotamuApi from '../../apis/sayangiKotamuApi'

function setCategories(payload) {
    return {
        type: SET_CATEGORIES,
        payload,
    }
}

function setLoadingCategories(payload) {
    return {
        type: SET_LOADING_CATEGORIES,
        payload,
    }
}

export function fetchAllCategory() {
    return async function (dispatch, getState) {
        try {
            const { auth } = getState()

            dispatch(setLoadingCategories(true))

            let response = await sayangiKotamuApi({
                method: 'GET',
                url: '/categories',
                headers: {
                    access_token: auth.accessToken,
                },
            })

            dispatch(setCategories(response.data))
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: err.response.data.message,
            })
        } finally {
            dispatch(setLoadingCategories(false))
        }
    }
}
