import { SET_IS_LOGGED_IN, SET_ACCESS_TOKEN, SET_LOADING } from "./actionType";
import sayangiKotamu from "../../apis/sayangiKotamuAPI";

export function setLogStatus(payload) {
  return { type: SET_IS_LOGGED_IN, payload };
}

export function setToken(payload) {
  return { type: SET_ACCESS_TOKEN, payload };
}

export function setLoading(payload) {
  return { type: SET_LOADING, payload };
}

export function logining(payload, history, toast) {
  return function (dispatch) {
    console.log(payload);
    return sayangiKotamu({
      method: `POST`,
      url: `/login`,
      data: payload,
    })
      .then((response) => {
        dispatch(setLogStatus(true));
        dispatch(setToken(response.data.accessToken));
        localStorage.setItem("access_token", response.data.accessToken);
        history.push("/beranda");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Terjadi kesalahan dalam input email/password!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
}

export function registering(payload) {
  return function () {
    sayangiKotamu({
      method: `POST`,
      url: `/register`,
      data: payload,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
