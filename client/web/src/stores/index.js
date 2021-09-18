import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authentication/reducer";
import reportReducer from "./reports/reducer";

const store = createStore(
  combineReducers({ auth: authReducer, report: reportReducer }),
  applyMiddleware(thunk)
);

export default store;
