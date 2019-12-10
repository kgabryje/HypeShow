import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions/actions";
import { discoverShowsUrl, withApiKey } from "../../shared/api";
import {
  loginByPass,
  logout,
  register,
} from "../../shared/firebase/service/auth";

function* fetchDiscover() {
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

export function* rootSaga() {
  yield takeLatest(actions.FETCH_DISCOVER_REQ, fetchDiscover);
  yield takeLatest(actions.LOGIN_BY_PASS_STARTED, loginByPass);
  yield takeLatest(actions.REGISTER_STARTED, register);
  yield takeLatest(actions.LOGOUT, logout);
}
