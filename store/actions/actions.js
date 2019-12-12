export const FETCH_DISCOVER_REQ = "FETCH_DISCOVER_REQ";
export const FETCH_DISCOVER_SUCCEEDED = "FETCH_DISCOVER_SUCCEEDED";
export const FETCH_DISCOVER_FAILED = "FETCH_DISCOVER_FAILED";
export const LOGIN_STARTED = "LOGIN_BY_PASS_STARTED";
export const AUTH_GOOGLE_STARTED = "AUTH_GOOGLE_STARTED";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILED = "AUTH_FAILED";
export const LOGOUT = "LOGOUT";
export const REGISTER_STARTED = "REGISTER_STARTED";

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

export const loginStarted = (email, password) => ({
  type: LOGIN_STARTED,
  payload: {
    email,
    password,
  },
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

export const authGoogleStarted = () => ({
  type: AUTH_GOOGLE_STARTED,
});

export const authSuccess = payload => ({
  type: AUTH_SUCCESS,
  payload: payload,
});

export const authFailed = payload => ({
  type: AUTH_FAILED,
  payload: payload,
});

export const logout = () => ({
  type: LOGOUT,
});
