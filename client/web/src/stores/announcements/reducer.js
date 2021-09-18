import { ADD_ANNOUNCEMENT, SET_LOADING, SET_ERROR } from "./actionType";

const initialState = {
  announcements: [],
  loading: true,
  errors: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ANNOUNCEMENT:
      return { ...state, announcements: [...state, payload] };
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_ERROR:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default reducer;
