import {
    SET_ANNOUNCEMENTS,
    SET_ANNOUNCEMENT_DETAIL,
    SET_LOADING_ANNOUNCEMENTS,
    SET_LOADING_ANNOUNCEMENT_DETAIL,
} from './actionType'

const initialState = {
    announcements: [],
    loadingAnnouncements: false,
    announcementDetail: [],
    loadingAnnouncementDetail: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_ANNOUNCEMENTS:
            return {
                ...state,
                announcements: action.payload,
            }
        case SET_ANNOUNCEMENT_DETAIL:
            return {
                ...state,
                announcementDetail: action.payload,
            }
        case SET_LOADING_ANNOUNCEMENTS:
            return {
                ...state,
                loadingAnnouncements: action.payload,
            }
        case SET_LOADING_ANNOUNCEMENT_DETAIL:
            return {
                ...state,
                loadingAnnouncementDetail: action.payload,
            }
        default:
            return state
    }
}
