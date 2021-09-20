import { ADD_ANNOUNCEMENT } from "./actionType";
import axios from "axios";

function addAnnouncement(payload) {
  return { type: ADD_ANNOUNCEMENT, payload };
}

export function postAnnouncement(payload) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/announcements", payload)
      .then((response) => {
        dispatch(addAnnouncement(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
