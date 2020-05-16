import {
  TASK_FETCH_REQUEST,
  TASK_FETCH_SUCCESS,
  TASK_FETCH_FAILURE,
  TASK_RESET,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  CREATE_REQUEST,
  ALL_TASK_FETCH_FAILURE,
  ALL_TASK_FETCH_REQUEST,
  ALL_TASK_FETCH_SUCCESS,
} from "./task_action";

const initialState = {
  isLoading: false,
  data: {},
  status: null,
  createMsg: "",
  tasks: {},
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

    case ALL_TASK_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ALL_TASK_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.data,
        status: action.payload.status,
      };
    case ALL_TASK_FETCH_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.data,
        status: action.payload,
      };
    case CREATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createMsg: action.payload.data,
        status: action.payload.status,
      };
    case CREATE_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        createMsg: action.payload.data,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default task_reducer;
