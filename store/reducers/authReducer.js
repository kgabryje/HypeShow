import {
  LOGIN_BY_PASS_STARTED,
  LOGIN_FAILED,
  LOGIN_GOOGLE_STARTED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_STARTED,
  REGISTER_SUCCESS,
} from "../actions/actions";

const initialState = {
  isRegistering: false,
  registered: false,
  loginByGoogle: false,
  isLogging: false,
  logged: false,
  errorMessage: "",
  user: {},
  navigation: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_STARTED:
      return {
        ...state,
        loading: true,
        registered: false,
        logged: false,
        loginByGoogle: false,
        errorMessage: "",
        user: {},
      };
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registered: true,
        user: action.payload,
      };
    case LOGIN_BY_PASS_STARTED:
      return {
        ...state,
        user: {},
        logged: false,
        loginByGoogle: false,
        loading: true,
        errorMessage: "",
      };
    case LOGIN_GOOGLE_STARTED:
      return {
        ...state,
        user: {},
        logged: false,
        loginByGoogle: true,
        loading: true,
        errorMessage: "",
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginByPass: false,
        loginByGoogle: false,
        loading: false,
        errorMessage: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        logged: true,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        logged: false,
        user: {},
      };
    default:
      return state;
  }
};
