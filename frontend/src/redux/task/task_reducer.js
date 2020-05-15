import {
  TASK_FETCH_REQUEST,
  TASK_FETCH_SUCCESS,
  TASK_FETCH_FAILURE,
  TASK_RESET,
} from "./task_action";

const initialState = {
  isLoading: false,
  data: {},
  status: null,
};

export const task_reducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_RESET:
      return {
        ...state,
        ...initialState,
      };
    case TASK_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case TASK_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        status: action.payload.status,
      };
    case TASK_FETCH_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default task_reducer;
