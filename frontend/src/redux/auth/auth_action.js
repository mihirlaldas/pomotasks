import axios from "axios";

export const AUTH_FETCH_REQUEST = "AUTH_FETCH_REQUEST";
export const AUTH_FETCH_SUCCESS = "AUTH_FETCH_SUCCESS";
export const AUTH_FETCH_FAILURE = "AUTH_FETCH_FAILURE";
export const TOGGLE_LOGIN = "TOGGLE_LOGIN";
export const AUTH_RESET = "RESET";

export const authReset = () => {
  return {
    type: AUTH_RESET
  };
};
export const fetchAuthRequest = () => {
  return {
    type: AUTH_FETCH_REQUEST
  };
};

export const fetchAuthSuccess = data => {
  return {
    type: AUTH_FETCH_SUCCESS,
    payload: data
  };
};

export const fetchAuthFailure = data => {
  return {
    type: AUTH_FETCH_FAILURE,
    payload: data
  };
};

export const toggleLogin = () => {
  return {
    type: TOGGLE_LOGIN
  };
};

export const fetchAuthData = config => {
  return async dispatch => {
    dispatch(fetchAuthRequest);
    return await axios(config)
      .then(res => dispatch(fetchAuthSuccess(res)))
      .catch(error => dispatch(fetchAuthFailure(error)));
  };
};
