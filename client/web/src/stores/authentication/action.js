import {
  SET_IS_LOGGED_IN,
  SET_ACCESS_TOKEN,
  SET_LOADING_LOGIN,
  SET_LOADING_REGISTER,
  SET_ID,
} from "./actionType";
import sayangiKotamu from "../../apis/sayangiKotamuAPI";
import axios from "axios";

export function setLogStatus(payload) {
  return { type: SET_IS_LOGGED_IN, payload };
}

export function setToken(payload) {
  return { type: SET_ACCESS_TOKEN, payload };
}

export function setLoadingLogin(payload) {
  return { type: SET_LOADING_LOGIN, payload };
}

export function setLoadingRegister(payload) {
  return { type: SET_LOADING_REGISTER, payload };
}

export function setID(payload) {
  return { type: SET_ID, payload };
}

export function logining(payload, history, toast) {
  return function (dispatch) {
    dispatch(setLoadingLogin(true));
    return sayangiKotamu({
      method: `POST`,
      url: `/login`,
      data: payload,
    })
      .then((response) => {
        dispatch(setLogStatus(true));
        dispatch(setToken(response.data.accessToken));
        dispatch(setID(response.data.id));
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
      })
      .finally(() => {
        dispatch(setLoadingLogin(false));
      });
  };
}

export function registering(payload) {
  return function (dispatch) {
    dispatch(setLoadingRegister(true));
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
      })
      .finally(() => {
        dispatch(setLoadingRegister(false));
      });
  };
}

export function aktifasiEmail(payload) {
  return function () {
    axios({
      method: `PATCH`,
      url: `http://54.86.137.89/activateEmail/${payload}`,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
