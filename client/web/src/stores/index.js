import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authentication/reducer";
import reportReducer from "./reports/reducer";
import categoryReducer from "./categories/reducer";
import aspirationReducer from "./aspiration/reducer";

const store = createStore(
  combineReducers({
    auth: authReducer,
    report: reportReducer,
    category: categoryReducer,
    aspiration: aspirationReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
