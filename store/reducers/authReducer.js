import {
  AUTH_FAILED,
  AUTH_GOOGLE_STARTED,
  AUTH_SUCCESS,
  LOGOUT,
  REGISTER_STARTED,
  LOGIN_STARTED,
} from "../actions/actions";

const initialState = {
  isRegistering: false,
  loginByGoogle: false,
  loading: false,
  errorMessage: "",
  user: {},
  navigation: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_STARTED:
      return {
        ...state,
        user: {},
        loginByGoogle: false,
        loading: true,
        errorMessage: "",
      };
    case LOGIN_STARTED:
      return {
        ...state,
        user: {},
        loginByGoogle: false,
        loading: true,
        errorMessage: "",
      };
    case AUTH_GOOGLE_STARTED:
      return {
        ...state,
        user: {},
        loginByGoogle: true,
        loading: true,
        errorMessage: "",
      };
    case AUTH_FAILED:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        errorMessage: "",
        user: {},
      };
    default:
      return state;
  }
};
