import { SET_LOADING_SEND_ASPIRATION } from './actionType'

import Toast from 'react-native-toast-message'

function setLoadingSendAspiration(payload) {
    return {
        type: SET_LOADING_SEND_ASPIRATION,
        payload,
    }
}

export function sendAspiration(payload) {
    //! Di body request fetch:
    //! -- Sementara user yang ngebuat di hardcode dulu. Nanti kasih akses token di headers
    //! -- Ini masih coba-coba aja, nanti sesuaiin sama server belakangan
    //! -- Nanti kirim dinas harus ID ke server
    return async function (dispatch) {
        try {
            dispatch(setLoadingSendAspiration(true))

            let response = await fetch('https://e9ce-110-138-83-131.ngrok.io/aspiration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    type: payload.type,
                    description: payload.description,
                    //! Kebawah masih di hardcode sementara
                    dinas: {
                        id: 'D0001',
                        name: 'Dinas Perhubungan',
                    },
                    user: {
                        email: 'jokowi@mail.com',
                        password: '$2a$10$wEHiAkLO.R5mEG0Ujd.7/OksyIZlBju40zI6QjwOmSNk5G6hZNZF6',
                        NIK: '314012401204901',
                        full_name: 'Joko Widodo',
                        kota: 'Jakarta',
                        id: 1,
                    },
                }),
            })
        } catch (err) {
            console.log(err)
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Maaf, untuk saat ini kamu tidak bisa mengirim aspirasi. Tunggu ya!',
            })
        } finally {
            dispatch(setLoadingSendAspiration(false))
        }
    }
}
