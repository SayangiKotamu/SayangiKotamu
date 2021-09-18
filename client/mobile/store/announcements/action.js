import {
    SET_ANNOUNCEMENTS,
    SET_ANNOUNCEMENT_DETAIL,
    SET_LOADING_ANNOUNCEMENTS,
    SET_LOADING_ANNOUNCEMENT_DETAIL,
} from './actionType'

import Toast from 'react-native-toast-message'

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
    return async function (dispatch) {
        try {
            dispatch(setLoadingAnnouncements(true))

            let response = await fetch('https://80f1-110-138-92-119.ngrok.io/announcements')

            if (response.ok) {
                response = await response.json()

                dispatch(setAnnouncements(response))
            } else {
                throw Error
            }
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Maaf, data pengumuman sedang tidak bisa diakses',
            })
        } finally {
            dispatch(setLoadingAnnouncements(false))
        }
    }
}

export function fetchAnnouncementById(id) {
    return async function (dispatch) {
        try {
            dispatch(setLoadingAnnouncementDetail(true))

            let response = await fetch(`https://80f1-110-138-92-119.ngrok.io/announcements/${id}`)

            if (response.ok) {
                response = await response.json()

                dispatch(setAnnouncementDetail(response))
            } else {
                throw Error
            }
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                bottomOffset: 70,
                text1: 'SayangiKotamu',
                text2: 'Maaf, data pengumuman sedang tidak bisa diakses',
            })
        } finally {
            dispatch(setLoadingAnnouncementDetail(false))
        }
    }
}
