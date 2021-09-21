import { ADD_ANNOUNCEMENT } from "./actionType";
import sayangiKotamu from "../../apis/sayangiKotamuAPI";

function addAnnouncement(payload) {
  return { type: ADD_ANNOUNCEMENT, payload };
}

export function postAnnouncement(payload) {
  return function (dispatch) {
    sayangiKotamu({
      method: "POST",
      url: "/announcements",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        dispatch(addAnnouncement(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
