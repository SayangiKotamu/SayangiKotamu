import { ADD_ANNOUNCEMENT, SET_LOADING } from "./actionType";

const initialState = {
  announcements: [],
  loadingAnnouncement: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ANNOUNCEMENT:
      return { ...state, announcements: [...state, payload] };
    case SET_LOADING:
      return { ...state, loadingAnnouncement: payload };
    default:
      return state;
  }
};

export default reducer;
