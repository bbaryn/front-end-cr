import { applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createBrowserHistory } from "history";
import rootEpic from "./root-epic";
import createRootReducer from "./root-reducer";
import { composeEnhancers } from "./utils";
import services from "../services";
import * as Types from "Types";

export const epicMiddleware = createEpicMiddleware<
  Types.RootAction,
  Types.RootAction,
  Types.RootState,
  Types.Services
>({ dependencies: services() });

export const history = createBrowserHistory();

export const configureStore = (initialState?: object) => {
  const middlewares = [epicMiddleware];

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  return createStore(createRootReducer(history), initialState, enhancer);
};

const store = configureStore();

epicMiddleware.run(rootEpic);

export default store;
