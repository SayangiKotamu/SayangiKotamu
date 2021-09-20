import {
    SET_ANNOUNCEMENTS,
    SET_ANNOUNCEMENT_DETAIL,
    SET_LOADING_ANNOUNCEMENTS,
    SET_LOADING_ANNOUNCEMENT_DETAIL,
} from './actionType'

import Toast from 'react-native-toast-message'

import sayangiKotamuApi from '../../apis/sayangiKotamuAxios'

function setAnnouncements(payload) {
    return {
        type: SET_ANNOUNCEMENTS,
        payload,
    }
}

function setLoadingAnnouncements(payload) {
    return {
        type: SET_LOADING_ANNOUNCEMENTS,
        payload,
    }
}

function setAnnouncementDetail(payload) {
    return {
        type: SET_ANNOUNCEMENT_DETAIL,
        payload,
    }
}

function setLoadingAnnouncementDetail(payload) {
    return {
        type: SET_LOADING_ANNOUNCEMENT_DETAIL,
        payload,
    }
}

export function fetchAllAnnouncement() {
    return async function (dispatch, getState) {
        try {
            const { auth } = getState()

            dispatch(setLoadingAnnouncements(true))

            let response = await sayangiKotamuApi({
                method: 'GET',
                url: '/announcments',
                headers: {
                    access_token: auth.accessToken,
                },
            })

            dispatch(setAnnouncements(response.data))
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: err.response.data.message,
            })
        } finally {
            dispatch(setLoadingAnnouncements(false))
        }
    }
}

export function fetchAnnouncementById(id) {
    return async function (dispatch, getState) {
        try {
            const { auth } = getState()

            dispatch(setLoadingAnnouncementDetail(true))

            let response = await sayangiKotamuApi({
                method: 'GET',
                url: `/announcments/${id}`,
                headers: {
                    access_token: auth.accessToken,
                },
            })

            dispatch(setAnnouncementDetail(response.data))
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: err.response.data.message,
            })
        } finally {
            dispatch(setLoadingAnnouncementDetail(false))
        }
    }
}
