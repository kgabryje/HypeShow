export const FETCH_DISCOVER_REQ = "FETCH_DISCOVER_REQ";
export const FETCH_DISCOVER_SUCCEEDED = "FETCH_DISCOVER_SUCCEEDED";
export const FETCH_DISCOVER_FAILED = "FETCH_DISCOVER_FAILED";
export const LOGIN_BY_PASS_STARTED = "LOGIN_BY_PASS_STARTED";
export const LOGIN_GOOGLE_STARTED = "LOGIN_GOOGLE_STARTED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";
export const REGISTER_STARTED = "REGISTER_STARTED";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const fetchDiscoverReq = () => ({
  type: FETCH_DISCOVER_REQ,
});

export const fetchDiscoverSucceeded = payload => ({
  type: FETCH_DISCOVER_SUCCEEDED,
  payload: payload,
});

export const fetchDiscoverFailed = payload => ({
  type: FETCH_DISCOVER_FAILED,
  payload: payload,
});

export const loginByPassStarted = (email, password) => ({
  type: LOGIN_BY_PASS_STARTED,
  payload: {
    email,
    password,
  },
});

export const loginGoogleStarted = () => ({
  type: LOGIN_GOOGLE_STARTED,
});

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload: payload,
});

export const loginFailed = payload => ({
  type: LOGIN_FAILED,
  payload: payload,
});

export const registerStarted = (email, password, firstName, lastName) => ({
  type: REGISTER_STARTED,
  payload: {
    email,
    password,
    firstName,
    lastName,
  },
});

export const registerFailed = payload => ({
  type: REGISTER_FAILED,
  payload: payload,
});

export const registerSuccess = payload => ({
  type: REGISTER_SUCCESS,
  payload: payload,
});

export const logout = () => ({
  type: LOGOUT,
});
