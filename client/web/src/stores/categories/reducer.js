import {
  SET_CATEGORIES,
  SET_LOADING,
  SET_ERROR,
  ADD_CATEGORIES,
} from "./actionType";

const initialState = {
  categories: [],
  loadingCategory: true,
  errors: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CATEGORIES:
      return { ...state, categories: payload };
    case ADD_CATEGORIES:
      return { ...state, categories: [...state, payload] };
    case SET_LOADING:
      return { ...state, loadingCategory: payload };
    case SET_ERROR:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default reducer;
