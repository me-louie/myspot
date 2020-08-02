import { SET_CURRENT_USER, LOG_OUT } from "../actions/userActions";
import { FETCH_PROFILEPIC_SUCCESS } from "../actions/imageUploadActions";

const initialState = {
  id: "",
  username: "",
  profilePic: "",
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
        id: action.payload._id,
        username: action.payload.username,
      };
    case LOG_OUT:
      return {
        ...state,
        id: "",
        username: "",
      };
    case FETCH_PROFILEPIC_SUCCESS:
      return {
        ...state,
        profilePic: action.payload,
      };
    default:
      return state;
  }
};

export default user;
