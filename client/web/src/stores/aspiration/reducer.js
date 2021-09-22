import { SET_ASPIRATION, SET_LOADING, SET_ERROR } from "./actionType";

const initialState = {
  aspiration: [],
  loadingAspiration: true,
  errors: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ASPIRATION:
      return { ...state, aspiration: payload };
    case SET_LOADING:
      return { ...state, loadingAspiration: payload };
    case SET_ERROR:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default reducer;
