import { SET_NOTIFICATION, SET_LOADING_NOTIFICATION } from './actionType'

const initialState = {
    notifications: [],
    loadingNotification: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_NOTIFICATION:
            return {
                ...state,
                notifications: action.payload,
            }
        case SET_LOADING_NOTIFICATION:
            return {
                ...state,
                loadingNotification: action.payload,
            }
        default:
            return state
    }
}
