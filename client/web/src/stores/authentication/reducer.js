import { SET_IS_LOGGED_IN, SET_ACCESS_TOKEN, SET_LOADING } from "./actionType";

const initialState = {
  isLoggedIn: false,
  accessToken: "",
  loading: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_IS_LOGGED_IN:
      console.log(payload);
      return { ...state, isLoggedIn: payload };
    case SET_ACCESS_TOKEN:
      console.log(payload);
      return { ...state, accessToken: payload };
    case SET_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
};

export default reducer;
