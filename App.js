import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import showsReducer from "./store/reducers/showsReducer";
import authReducer from "./store/reducers/authReducer";
import { rootSaga } from "./store/sagas/rootSaga";
import { RouterContainer } from "./navigation/RouterContainer";

const rootReducer = combineReducers({
  shows: showsReducer,
  authData: authReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default function App() {
  console.ignoredYellowBox = ["Setting a timer"];
  return (
    <Provider store={store}>
      <RouterContainer />
    </Provider>
  );
}
