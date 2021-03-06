import {
  SET_CATEGORIES,
  SET_LOADING,
  SET_ERROR,
  ADD_CATEGORIES,
} from "./actionType";
import sayangiKotamu from "../../apis/sayangiKotamuAPI";

function setCategories(payload) {
  return { type: SET_CATEGORIES, payload };
}

function addCategories(payload) {
  return { type: ADD_CATEGORIES, payload };
}

function setLoading(payload) {
  return { type: SET_LOADING, payload };
}

function setError(payload) {
  return { type: SET_ERROR, payload };
}

export function fetchCategories() {
  return function (dispatch) {
    dispatch(setError(null));
    dispatch(setLoading(true));
    sayangiKotamu({
      method: "GET",
      url: "/categories",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        dispatch(setCategories(response.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

export function postCategories(payload) {
  return function (dispatch) {
    dispatch(setLoading(true));
    sayangiKotamu({
      method: "POST",
      url: "/categories",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
      data: payload,
    })
      .then((response) => {
        dispatch(addCategories(response.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
