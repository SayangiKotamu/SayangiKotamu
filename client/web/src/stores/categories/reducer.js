import { SET_REPORTS, SET_DETAIL_REPORT, SET_LOADING } from "./actionType";

const initialState = {
  reports: [],
  reportDetail: [],
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REPORTS:
      return { ...state, reports: payload };
    case SET_DETAIL_REPORT:
      return { ...state, reportDetail: payload };
    case SET_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
};

export default reducer;
