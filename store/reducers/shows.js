import {
  FETCH_DISCOVER_FAILED,
  FETCH_DISCOVER_REQ,
  FETCH_DISCOVER_SUCCEEDED,
} from "../actions/actions";

const initialState = {
  discoverShows: [],
  isLoadingShows: false,
  errorMessage: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISCOVER_REQ:
      return {
        ...state,
        isLoadingShows: true,
        errorMessage: "",
      };
    case FETCH_DISCOVER_SUCCEEDED:
      return {
        discoverShows: action.payload.results,
        isLoadingShows: false,
        errorMessage: "",
      };
    case FETCH_DISCOVER_FAILED:
      return {
        ...state,
        isLoadingShows: false,
        errorMessage: action.payload.status_message,
      };
    default:
      return state;
  }
};
