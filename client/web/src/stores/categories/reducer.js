import { SET_CATEGORIES, SET_LOADING, SET_ERROR } from "./actionType";

const initialState = {
  categories: [],
  loading: true,
  errors: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CATEGORIES:
      return { ...state, categories: payload };
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_ERROR:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default reducer;
