import { SET_LOADING_SEND_ASPIRATION } from './actionType'

const initialState = {
    loadingSendAspiration: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING_SEND_ASPIRATION:
            return {
                ...state,
                loadingSendAspiration: action.payload,
            }
        default:
            return state
    }
}
