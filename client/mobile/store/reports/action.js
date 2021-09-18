import {
    SET_REPORTS_LIST,
    SET_LOADING_REPORTS,
    SET_DETAIL_REPORT,
    SET_LOADING_DETAIL,
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

export function fetchAllReports(payload) {
    return async function (dispatch) {
        try {
            dispatch(setLoadingReports(true))

            let response = await fetch('https://f573-110-138-92-119.ngrok.io/reports')

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

            let response = await fetch(`https://f573-110-138-92-119.ngrok.io/reports/${id}`)

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
