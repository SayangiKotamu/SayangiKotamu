import { SET_LOADING_SEND_ASPIRATION } from './actionType'

import Toast from 'react-native-toast-message'

import sayangiKotamuApi from '../../apis/sayangiKotamuAxios'

function setLoadingSendAspiration(payload) {
    return {
        type: SET_LOADING_SEND_ASPIRATION,
        payload,
    }
}

export function sendAspiration(payload) {
    return async function (dispatch, getState) {
        try {
            const { auth } = getState()

            dispatch(setLoadingSendAspiration(true))

            await sayangiKotamuApi({
                method: 'POST',
                url: '/aspirations/create',
                headers: {
                    access_token: auth.accessToken,
                },
                data: {
                    type: payload.type,
                    dinas: payload.dinas,
                    title: payload.title,
                    description: payload.description,
                },
            })

            Toast.show({
                type: 'success',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Aspirasi Anda berhasil kami terima, terimakasih atas aspirasinya!',
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
            dispatch(setLoadingSendAspiration(false))
        }
    }
}
