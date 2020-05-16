import axios from "axios";

export const TASK_FETCH_REQUEST = "TASK_FETCH_REQUEST";
export const TASK_FETCH_SUCCESS = "TASK_FETCH_SUCCESS";
export const TASK_FETCH_FAILURE = "TASK_FETCH_FAILURE";
export const TASK_RESET = "TASK_RESET";

export const taskReset = () => {
  return {
    type: TASK_RESET,
  };
};
export const fetchTaskRequest = () => {
  return {
    type: TASK_FETCH_REQUEST,
  };
};

export const fetchTaskSuccess = (data) => {
  return {
    type: TASK_FETCH_SUCCESS,
    payload: data,
  };
};

export const fetchTaskFailure = (data) => {
  return {
    type: TASK_FETCH_FAILURE,
    payload: data,
  };
};

export const fetchTaskData = (config) => {
  return async (dispatch) => {
    dispatch(fetchTaskRequest);
    return await axios(config)
      .then((res) => dispatch(fetchTaskSuccess(res)))
      .catch((error) => dispatch(fetchTaskFailure(error)));
  };
};

export const CREATE_REQUEST = "CREATE_REQUEST";
export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const CREATE_FAILURE = "CREATE_FAILURE";

export const createRequest = () => {
  return {
    type: CREATE_REQUEST,
  };
};

export const createSuccess = (data) => {
  return {
    type: CREATE_SUCCESS,
    payload: data,
  };
};

export const createFailure = (data) => {
  return {
    type: CREATE_FAILURE,
    payload: data,
  };
};

export const create = (config) => {
  return async (dispatch) => {
    dispatch(createRequest);
    return await axios(config)
      .then((res) => dispatch(createSuccess(res)))
      .catch((error) => dispatch(createFailure(error)));
  };
};
