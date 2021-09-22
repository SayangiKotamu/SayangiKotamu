import {
  SET_REPORTS,
  SET_DETAIL_REPORT,
  EDIT_REPORT,
  SET_LOADING_REPORTS,
  SET_LOADING_DETAIL,
  SET_ERROR,
} from "./actionType";
import sayangiKotamu from "../../apis/sayangiKotamuAPI";

function setReports(payload) {
  return { type: SET_REPORTS, payload };
}

function setDetailReport(payload) {
  return { type: SET_DETAIL_REPORT, payload };
}

function setLoadingReports(payload) {
  return { type: SET_LOADING_REPORTS, payload };
}

function setLoadingDetail(payload) {
  return { type: SET_LOADING_DETAIL, payload };
}

function setError(payload) {
  return { type: SET_ERROR, payload };
}

function editReport(payload) {
  return { type: EDIT_REPORT, payload };
}

export function fetchReports() {
  return function (dispatch) {
    dispatch(setError(null));
    dispatch(setLoadingReports(true));
    sayangiKotamu({
      method: "GET",
      url: "/reports",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        dispatch(setReports(response.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoadingReports(false));
      });
  };
}

export function fetchReportById(id) {
  return function (dispatch) {
    dispatch(setError(null));
    dispatch(setLoadingDetail(true));
    sayangiKotamu({
      method: "GET",
      url: `/reports/${id}`,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        dispatch(setDetailReport(response.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoadingDetail(false));
      });
  };
}

export function fetchReportByCategory(id) {
  return function (dispatch) {
    dispatch(setError(null));
    dispatch(setLoadingReports(true));
    sayangiKotamu({
      method: "GET",
      url: `/reports/?category=${id}`,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        dispatch(setReports(response.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoadingReports(false));
      });
  };
}

export function patchReport(id, payload) {
  return function (dispatch, getState) {
    const { auth } = getState();

    dispatch(setError(null));
    sayangiKotamu({
      method: "PATCH",
      url: `/reports/${id}`,
      headers: {
        access_token: auth.accessToken,
      },
      data: payload,
    })
      .then((response) => {
        dispatch(editReport(response.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      });
  };
}
