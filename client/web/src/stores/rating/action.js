import { SET_RATING, SET_LOADING, SET_ERROR } from "./actionType";
import sayangiKotamu from "../../apis/sayangiKotamuAPI";

function setRating(payload) {
  return { type: SET_RATING, payload };
}

function setLoading(payload) {
  return { type: SET_LOADING, payload };
}

function setError(payload) {
  return { type: SET_ERROR, payload };
}

export function fetchRating() {
  return function (dispatch) {
    dispatch(setError(null));
    dispatch(setLoading(true));
    sayangiKotamu({
      method: "GET",
      url: "/rating",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        console.log(response.data);
        dispatch(setRating(response.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
