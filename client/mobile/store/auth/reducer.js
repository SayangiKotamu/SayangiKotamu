import { SET_IS_LOGGED_IN, SET_ACCESS_TOKEN, SET_LOADING_LOGIN } from './actionType'

const initialState = {
    isLoggedIn: false,
    accessToken: '',
    loadingLogin: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload,
            }
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload,
            }
        case SET_LOADING_LOGIN:
            return {
                ...state,
                loadingLogin: action.payload,
            }
        default:
            return state
    }
}
