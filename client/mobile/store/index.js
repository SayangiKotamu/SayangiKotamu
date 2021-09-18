import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './auth/reducer'

const store = createStore(combineReducers({ auth: authReducer }), applyMiddleware(thunk))

export default store
