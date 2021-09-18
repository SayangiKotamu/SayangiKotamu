import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authentication/reducer";
import reportReducer from "./reports/reducer";
import categoryReducer from "./categories/reducer";

const store = createStore(
  combineReducers({
    auth: authReducer,
    report: reportReducer,
    category: categoryReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
