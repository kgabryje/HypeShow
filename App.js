import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Layout } from "./navigation/router";
import createSagaMiddleware from "redux-saga";
import showsReducer from "./store/reducers/showsReducer";
import authReducer from "./store/reducers/authReducer";
import { rootSaga } from "./store/sagas/sagas";

const rootReducer = combineReducers({
  shows: showsReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}
