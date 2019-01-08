import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

import { reducer as albumsReducer } from "../modules/albums";

export default (history: History<any>) => {
  return combineReducers({
    router: connectRouter(history),
    albums: albumsReducer
  });
};
