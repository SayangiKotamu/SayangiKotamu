import { SET_CATEGORIES, SET_LOADING_CATEGORIES } from './actionType'

const initialState = {
    categories: [],
    loadingCategories: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        case SET_LOADING_CATEGORIES:
            return {
                ...state,
                loadingCategories: action.payload,
            }
        default:
            return state
    }
}
