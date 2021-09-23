import {
  SET_ID,
  SET_IS_LOGGED_IN,
  SET_ACCESS_TOKEN,
  SET_LOADING_LOGIN,
  SET_LOADING_REGISTER,
} from "./actionType";

const initialState = {
  id: "",
  isLoggedIn: false,
  accessToken: "",
  loadingLogin: false,
  loadingRegister: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ID:
      return { ...state, id: payload };
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: payload };
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: payload };
    case SET_LOADING_LOGIN:
      return { ...state, loadingLogin: payload };
    case SET_LOADING_REGISTER:
      return { ...state, loadingRegister: payload };
    default:
      return state;
  }
};

export default reducer;
