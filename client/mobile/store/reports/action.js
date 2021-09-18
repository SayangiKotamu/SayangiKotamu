import {
    SET_REPORTS_LIST,
    SET_LOADING_REPORTS,
    SET_DETAIL_REPORT,
    SET_LOADING_DETAIL,
    SET_LOADING_SEND_REPORT,
} from './actionType'

import Toast from 'react-native-toast-message'

function setReportsList(payload) {
    return {
        type: SET_REPORTS_LIST,
        payload,
    }
}

function setLoadingReports(payload) {
    return {
        type: SET_LOADING_REPORTS,
        payload,
    }
}

function setDetailReport(payload) {
    return {
        type: SET_DETAIL_REPORT,
        payload,
    }
}

function setLoadingDetailReport(payload) {
    return {
        type: SET_LOADING_DETAIL,
        payload,
    }
}

function setLoadingSendReport(payload) {
    return {
        type: SET_LOADING_SEND_REPORT,
        payload,
    }
}

export function fetchAllReports(payload) {
    return async function (dispatch) {
        try {
            dispatch(setLoadingReports(true))

            let response = await fetch('https://e9ce-110-138-83-131.ngrok.io/reports')

            if (response.ok) {
                response = await response.json()

                dispatch(setReportsList(response))
            } else {
                throw Error
            }
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Maaf, data laporan sedang tidak bisa diakses',
            })
        } finally {
            dispatch(setLoadingReports(false))
        }
    }
}

export function fetchReportById(id) {
    return async function (dispatch) {
        try {
            dispatch(setLoadingDetailReport(true))

            let response = await fetch(`https://e9ce-110-138-83-131.ngrok.io/reports/${id}`)

            if (response.ok) {
                response = await response.json()

                dispatch(setDetailReport(response))
            } else {
                throw Error
            }
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Maaf, data laporan sedang tidak bisa diakses',
            })
        } finally {
            dispatch(setLoadingDetailReport(false))
        }
    }
}

export function addReport(payload) {
    //! Di body request fetch:
    //! -- Sementara user yang ngebuat di hardcode dulu. Nanti kasih akses token di headers
    //! -- Ini masih coba-coba aja, nanti sesuaiin sama server belakangan
    //! -- Nanti kirim category harus ID, kirim dinas harus ID ke server
    return async function (dispatch) {
        try {
            dispatch(setLoadingSendReport(true))

            let response = await fetch('https://e9ce-110-138-83-131.ngrok.io/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    title: payload.title,
                    description: payload.description,
                    location: payload.location,
                    category: payload.category, //! Ini masih ngirim value nya (harusnya ID)
                    // dinas: payload.dinas,
                    lat: {
                        $numberDecimal: payload.lat,
                    },
                    long: {
                        $numberDecimal: payload.long,
                    },
                    picture: payload.picture,
                    //! Kebawah masih di hardcode sementara
                    user: {
                        email: 'jokowi@mail.com',
                        password: '$2a$10$wEHiAkLO.R5mEG0Ujd.7/OksyIZlBju40zI6QjwOmSNk5G6hZNZF6',
                        NIK: '314012401204901',
                        full_name: 'Joko Widodo',
                        kota: 'Jakarta',
                        id: 1,
                    },
                    dinas: {
                        id: 'D0001',
                        name: 'Dinas Perhubungan',
                    },
                    status: 'Diterima',
                    issued_date: '2021-09-18T04:45:22.074Z',
                    finished_date: null,
                    upVote: 0,
                    downVote: 0,
                }),
            })
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Maaf, untuk saat ini kamu tidak bisa mengirim laporan. Tunggu ya!',
            })
        } finally {
            dispatch(setLoadingSendReport(false))
        }
    }
}
