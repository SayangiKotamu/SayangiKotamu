import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './auth/reducer'
import reportsReducer from './reports/reducer'
import announcementsReducer from './announcements/reducer'
import categoriesReducer from './categories/reducer'
import dinasReducer from './dinas/reducer'

const store = createStore(
    combineReducers({
        auth: authReducer,
        reports: reportsReducer,
        announcements: announcementsReducer,
        categories: categoriesReducer,
        dinas: dinasReducer,
    }),
    applyMiddleware(thunk)
)

export default store
