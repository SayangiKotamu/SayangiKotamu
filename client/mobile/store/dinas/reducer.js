import { SET_DINAS, SET_LOADING_DINAS } from './actionType'

const initialState = {
    dinas: [],
    loadingDinas: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DINAS:
            return {
                ...state,
                dinas: action.payload,
            }
        case SET_LOADING_DINAS:
            return {
                ...state,
                loadingDinas: action.payload,
            }
        default:
            return state
    }
}
