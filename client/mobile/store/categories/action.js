import { SET_CATEGORIES, SET_LOADING_CATEGORIES } from './actionType'

import Toast from 'react-native-toast-message'

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
    return async function (dispatch) {
        try {
            dispatch(setLoadingCategories(true))

            let response = await fetch('https://e9ce-110-138-83-131.ngrok.io/categories')

            if (response.ok) {
                response = await response.json()

                dispatch(setCategories(response))
            } else {
                throw Error
            }
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Maaf, data kategori sedang tidak bisa diakses',
            })
        } finally {
            dispatch(setLoadingCategories(false))
        }
    }
}
