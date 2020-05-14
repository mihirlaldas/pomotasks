import {
  AUTH_FETCH_REQUEST,
  AUTH_FETCH_SUCCESS,
  AUTH_FETCH_FAILURE,
  TOGGLE_LOGIN,
  AUTH_RESET
} from "./auth_action";

const initialState = {
  isLoggedin: false,
  isLoading: false,
  data: {},
  status: null
};

export const auth_reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_RESET:
      return {
        ...state,
        ...initialState
      };
    case AUTH_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case AUTH_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        status: action.payload.status
      };
    case AUTH_FETCH_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        status: action.payload
      };
    case TOGGLE_LOGIN:
      return {
        ...state,
        isLoggedin: true
      };
    default:
      return state;
  }
};

export default auth_reducer;
