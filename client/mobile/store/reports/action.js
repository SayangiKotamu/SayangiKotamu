import {
    SET_REPORTS_LIST,
    SET_LOADING_REPORTS,
    SET_DETAIL_REPORT,
    SET_LOADING_DETAIL,
    SET_LOADING_SEND_REPORT,
} from './actionType'

import Toast from 'react-native-toast-message'

import baseURL from '../../apis/sayangiKotamu'
import sayangiKotamuApi from '../../apis/sayangiKotamuAxios'

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

export function fetchAllReports() {
    return async function (dispatch, getState) {
        try {
            const { auth } = getState()

            dispatch(setLoadingReports(true))

            let response = await sayangiKotamuApi({
                method: 'GET',
                url: '/reportUser',
                headers: {
                    access_token: auth.accessToken,
                },
            })

            dispatch(setReportsList(response.data))
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: err.response.data.message,
            })
        } finally {
            dispatch(setLoadingReports(false))
        }
    }
}

export function fetchReportById(id) {
    return async function (dispatch, getState) {
        try {
            const { auth } = getState()

            dispatch(setLoadingDetailReport(true))

            let response = await sayangiKotamuApi({
                method: 'GET',
                url: `/reportUser/${id}`,
                headers: {
                    access_token: auth.accessToken,
                },
            })

            dispatch(setDetailReport(response.data))
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: err.response.data.message,
            })
        } finally {
            dispatch(setLoadingDetailReport(false))
        }
    }
}

export function addReport(payload) {
    return async function (dispatch, getState) {
        try {
            const { auth } = getState()

            dispatch(setLoadingSendReport(true))

            await sayangiKotamuApi({
                method: 'POST',
                url: '/reportUser',
                headers: {
                    access_token: auth.accessToken,
                },
                data: {
                    title: payload.title,
                    description: payload.description,
                    location: payload.location,
                    lat: String(payload.lat),
                    long: String(payload.long),
                    picture: payload.picture,
                    dinas: payload.dinas,
                    category: payload.category,
                },
            })

            Toast.show({
                type: 'success',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Laporan Anda berhasil kami terima, terimakasih atas laporan Anda! Akan kami segera proses ya!',
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
            dispatch(setLoadingSendReport(false))
        }
    }
}
