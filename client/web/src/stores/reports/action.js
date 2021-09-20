import {
  SET_REPORTS,
  SET_DETAIL_REPORT,
  EDIT_REPORT,
  SET_LOADING,
  SET_ERROR,
} from "./actionType";
import axios from "axios";

function setReports(payload) {
  return { type: SET_REPORTS, payload };
}

function setDetailReport(payload) {
  return { type: SET_DETAIL_REPORT, payload };
}

function setLoading(payload) {
  return { type: SET_LOADING, payload };
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
    dispatch(setLoading(true));
    axios
      .get("http://localhost:3001/reports")
      .then((response) => {
        dispatch(setReports(response.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

export function fetchReportById(id) {
  return function (dispatch) {
    dispatch(setError(null));
    dispatch(setLoading(true));
    axios
      .get(`http://localhost:3001/reports/${id}`)
      .then((response) => {
        dispatch(setDetailReport(response.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

export function patchReport(payload) {
  return function (dispatch) {
    dispatch(setError(null));
    dispatch(setLoading(true));
    axios
      .put(`http://localhost:3001/reports/${payload.id}`, payload)
      .then((response) => {
        dispatch(editReport(response.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
