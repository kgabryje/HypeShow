export const FETCH_DISCOVER_REQ = "FETCH_DISCOVER_REQ";
export const FETCH_DISCOVER_SUCCEEDED = "FETCH_DISCOVER_SUCCEEDED";
export const FETCH_DISCOVER_FAILED = "FETCH_DISCOVER_FAILED";

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
