import { discoverShowsUrl, withApiKey } from "../../shared/api";
import { call, put } from "redux-saga/effects";
import * as actions from "../actions/actions";

export function* fetchDiscover() {
  const discoverApiUrl = withApiKey(discoverShowsUrl);

  try {
    const res = yield call(() => fetch(discoverApiUrl));
    const resData = yield call(() => res.json());

    if (!res.ok) {
      yield put(actions.fetchDiscoverFailed(resData));
    } else {
      yield put(actions.fetchDiscoverSucceeded(resData));
    }
  } catch (err) {
    err.status_message = err.message;
    yield put(actions.fetchDiscoverFailed(err));
  }
}
