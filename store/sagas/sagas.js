import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions/actions";
import { discoverShowsUrl, withApiKey } from "../../shared/api";
import { auth, fireStore } from "../../shared/firebase/firebase";
import { FIREBASE_USERS_PATH } from "../../shared/constants";

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

function* loginByPassword(action) {
  const { email, password } = action.payload;
  try {
    const result = yield call(() =>
      auth.signInWithEmailAndPassword(email, password)
    );
    const lastLoginAt = Date.now();
    fireStore
      .collection(FIREBASE_USERS_PATH)
      .doc(result.user.uid)
      .set(
        {
          lastLoginAt,
        },
        { merge: true }
      );
    yield put(actions.loginSuccess({ email }));
  } catch (error) {
    yield put(actions.loginFailed(error));
    console.log(error);
  }
}

export function* rootSaga() {
  yield takeLatest(actions.FETCH_DISCOVER_REQ, fetchDiscover);
  yield takeLatest(actions.LOGIN_BY_PASS_STARTED, loginByPassword);
}
