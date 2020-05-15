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
