import {
    SET_REPORTS_LIST,
    SET_LOADING_REPORTS,
    SET_DETAIL_REPORT,
    SET_LOADING_DETAIL,
    SET_LOADING_SEND_REPORT,
    SET_LOADING_UPVOTE_REPORT,
    SET_LOADING_DOWNVOTE_REPORT,
    SET_LOADING_RATE_REPORT,
} from './actionType'

import Toast from 'react-native-toast-message'

import sayangiKotamuApi from '../../apis/sayangiKotamuApi'

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

function setLoadingUpVoteReport(payload) {
    return {
        type: SET_LOADING_UPVOTE_REPORT,
        payload,
    }
}

function setLoadingDownVoteReport(payload) {
    return {
        type: SET_LOADING_DOWNVOTE_REPORT,
        payload,
    }
}

function setLoadingRateReport(payload) {
    return {
        type: SET_LOADING_RATE_REPORT,
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

export function fetchReportByCategory(categoryId) {
    return async function (dispatch, getState) {
        try {
            const { auth } = getState()

            dispatch(setLoadingReports(true))

            let response = await sayangiKotamuApi({
                method: 'GET',
                url: `/reportUser/category/${categoryId}`,
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

export function upVoteReport(id) {
    return async function (dispatch, getState) {
        try {
            const { auth } = getState()

            dispatch(setLoadingUpVoteReport(true))

            await sayangiKotamuApi({
                method: 'PATCH',
                url: `/reportUser/up/${id}`,
                headers: {
                    access_token: auth.accessToken,
                },
            })

            Toast.show({
                type: 'success',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Berhasil melakukan upvote terhadap laporan ini',
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
            dispatch(setLoadingUpVoteReport(false))
        }
    }
}

export function downVoteReport(id) {
    return async function (dispatch, getState) {
        try {
            const { auth } = getState()

            dispatch(setLoadingDownVoteReport(true))

            await sayangiKotamuApi({
                method: 'PATCH',
                url: `/reportUser/down/${id}`,
                headers: {
                    access_token: auth.accessToken,
                },
            })

            Toast.show({
                type: 'success',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Berhasil melakukan downvote terhadap laporan ini',
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
            dispatch(setLoadingDownVoteReport(false))
        }
    }
}

export function rateReport(payload) {
    return async function (dispatch, getState) {
        try {
            const { auth } = getState()

            dispatch(setLoadingRateReport(true))

            await sayangiKotamuApi({
                method: 'POST',
                url: '/rating',
                headers: {
                    access_token: auth.accessToken,
                },
                data: {
                    rating: payload.rating,
                    comment: payload.comment,
                    dinas: payload.dinas,
                    report: payload.report,
                },
            })

            Toast.show({
                type: 'success',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Terimakasih telah memberikan feedback terhadap laporan ini',
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
            dispatch(setLoadingRateReport(false))
        }
    }
}
