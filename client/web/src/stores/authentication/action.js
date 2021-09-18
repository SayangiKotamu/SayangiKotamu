import { SET_IS_LOGGED_IN, SET_ACCESS_TOKEN, SET_LOADING } from "./actionType";
import axios from "axios";

export function setLogStatus(payload) {
  return { type: SET_IS_LOGGED_IN, payload };
}

export function setToken(payload) {
  return { type: SET_ACCESS_TOKEN, payload };
}

export function setLoading(payload) {
  return { type: SET_LOADING, payload };
}

export function logining(payload) {
  return function (dispatch) {
    return axios({
      method: `POST`,
      url: `http://localhost:3001/login`,
      data: payload,
    })
      .then((response) => {
        dispatch(setLogStatus(true));
        dispatch(setToken(response.data.accessToken));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function registering(payload) {
  return function () {
    axios({
      method: `POST`,
      url: `http://localhost:3001/register`,
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
