import { ADD_ANNOUNCEMENT } from "./actionType";
import sayangiKotamu from "../../apis/sayangiKotamuAPI";

function addAnnouncement(payload) {
  return { type: ADD_ANNOUNCEMENT, payload };
}

export function postAnnouncement(payload) {
  return function (dispatch, getState) {
    const { auth } = getState();

    sayangiKotamu({
      method: "POST",
      url: "/announcements",
      headers: {
        access_token: auth.accessToken,
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
