import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authentication/reducer";

const store = createStore(
  combineReducers({ auth: authReducer }),
  applyMiddleware(thunk)
);

export default store;
