import auth_reducer from "./auth/auth_reducer";
import task_reducer from "./task/task_reducer";
import { combineReducers } from "redux";

export default combineReducers({ auth_reducer, task_reducer });
