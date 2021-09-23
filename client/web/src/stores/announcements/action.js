import { ADD_ANNOUNCEMENT, SET_LOADING } from "./actionType";
import sayangiKotamu from "../../apis/sayangiKotamuAPI";

function addAnnouncement(payload) {
  return { type: ADD_ANNOUNCEMENT, payload };
}

function setLoading(payload) {
  return { type: SET_LOADING, payload };
}

export function postAnnouncement(payload) {
  return function (dispatch) {
    dispatch(setLoading(true));
    sayangiKotamu({
      method: "POST",
      url: "/announcments",
      data: payload,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        console.log(response);
        dispatch(addAnnouncement(response.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
