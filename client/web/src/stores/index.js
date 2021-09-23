import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authentication/reducer";
import reportReducer from "./reports/reducer";
import ratingReducer from "./rating/reducer";
import categoryReducer from "./categories/reducer";
import aspirationReducer from "./aspiration/reducer";
import announcementReducer from "./announcements/reducer";

const store = createStore(
  combineReducers({
    auth: authReducer,
    report: reportReducer,
    rating: ratingReducer,
    category: categoryReducer,
    aspiration: aspirationReducer,
    announcement: announcementReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
