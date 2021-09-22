import {
  SET_REPORTS,
  SET_DETAIL_REPORT,
  SET_LOADING_REPORTS,
  SET_LOADING_DETAIL,
  SET_ERROR,
} from "./actionType";

const initialState = {
  reports: [],
  reportDetail: {},
  loadingReport: true,
  loadingDetail: true,
  errors: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REPORTS:
      return { ...state, reports: payload };
    case SET_DETAIL_REPORT:
      return { ...state, reportDetail: payload };
    case SET_LOADING_REPORTS:
      return { ...state, loadingReport: payload };
    case SET_LOADING_DETAIL:
      return { ...state, loadingDetail: payload };
    case SET_ERROR:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default reducer;
