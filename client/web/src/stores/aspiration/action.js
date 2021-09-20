import { SET_ASPIRATION, SET_LOADING, SET_ERROR } from "./actionType";
import sayangiKotamu from "../../apis/sayangiKotamuAPI";

function setAspiration(payload) {
  return { type: SET_ASPIRATION, payload };
}

function setLoading(payload) {
  return { type: SET_LOADING, payload };
}

function setError(payload) {
  return { type: SET_ERROR, payload };
}

export function fetchAspiration() {
  return function (dispatch, getState) {
    const { auth } = getState();

    dispatch(setError(null));
    dispatch(setLoading(true));
    sayangiKotamu({
      method: "GET",
      url: "/aspirations",
      headers: {
        access_token: auth.accessToken,
      },
    })
      .then((response) => {
        console.log(response.data);
        dispatch(setAspiration(response.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
