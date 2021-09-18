import { SET_LOADING, SET_ERROR, ADD_ANNOUNCEMENT } from "./actionType";
import axios from "axios";

function setLoading(payload) {
  return { type: SET_LOADING, payload };
}

function setError(payload) {
  return { type: SET_ERROR, payload };
}

function addAnnouncement(payload) {
  return { type: ADD_ANNOUNCEMENT, payload };
}

export function postAnnouncement(payload) {
  return function (dispatch) {
    dispatch(setError(null));
    dispatch(setLoading(true));
    axios
      .post("http://localhost:3001/announcements", payload)
      .then((response) => {
        dispatch(addAnnouncement(response.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
