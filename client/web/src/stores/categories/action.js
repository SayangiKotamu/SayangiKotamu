import { SET_CATEGORIES, SET_LOADING, SET_ERROR } from "./actionType";
import axios from "axios";

function setCategories(payload) {
  return { type: SET_CATEGORIES, payload };
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
    axios
      .get("http://localhost:3001/categories")
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
