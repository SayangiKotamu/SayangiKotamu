import { SET_RATING, SET_LOADING, SET_ERROR } from "./actionType";

const initialState = {
  rating: [],
  loading: true,
  errors: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_RATING:
      return { ...state, rating: payload };
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_ERROR:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default reducer;
