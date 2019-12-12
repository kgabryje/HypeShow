import { takeLatest } from "redux-saga/effects";
import * as actions from "../actions/actions";
import { loginByPass, logout, register } from "./auth";
import { fetchDiscover } from "./shows";

export function* rootSaga() {
  yield takeLatest(actions.FETCH_DISCOVER_REQ, fetchDiscover);
  yield takeLatest(actions.LOGIN_STARTED, loginByPass);
  yield takeLatest(actions.REGISTER_STARTED, register);
  yield takeLatest(actions.LOGOUT, logout);
}
