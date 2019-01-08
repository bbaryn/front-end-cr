import { StateType } from "typesafe-actions";
import { RouterAction } from "connected-react-router";

import rootReducer from "./root-reducer";
import { AlbumAction } from "../modules/albums";

declare module "Types" {
  export type RootState = StateType<ReturnType<typeof rootReducer>>;
  export type RootAction = RouterAction | AlbumAction;
}
