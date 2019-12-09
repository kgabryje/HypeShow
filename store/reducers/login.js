import {
  LOGIN_BY_PASS_STARTED,
  LOGIN_GOOGLE_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "../actions/actions";

const initialState = {
  loginByPass: false,
  loginByGoogle: false,
  isLogging: false,
  errorMessage: "",
  logged: false,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_BY_PASS_STARTED:
      return {
        ...state,
        user: null,
        logged: false,
        loginByGoogle: false,
        loginByPass: true,
        isLogging: true,
        errorMessage: "",
      };
    case LOGIN_GOOGLE_STARTED:
      return {
        ...state,
        loginByGoogle: true,
        loginByPass: false,
        isLogging: true,
        errorMessage: "",
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginByPass: false,
        loginByGoogle: false,
        isLogging: false,
        errorMessage: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        logged: true,
        isLogging: false,
        errorMessage: "",
      };
    default:
      return state;
  }
};
