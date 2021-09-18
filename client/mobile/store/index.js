import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './auth/reducer'
import reportsReducer from './reports/reducer'

const store = createStore(
    combineReducers({ auth: authReducer, reports: reportsReducer }),
    applyMiddleware(thunk)
)

export default store
