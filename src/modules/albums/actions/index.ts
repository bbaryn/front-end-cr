import * as actions from "./actions";
import { ActionType } from "typesafe-actions";

export type Action = ActionType<typeof actions>;
export * from "./actions";
