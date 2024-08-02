import { combineReducers } from "redux";
import auth from "./authReducer";

const appReducer = combineReducers({
  auth,
  setup: {},
});

export default appReducer;
