import { getType } from "typesafe-actions";

import { Album } from "./models";
import { loadAlbumsList, setAlbumsList } from "./actions";
import { Action } from "./actions";
import { combineReducers } from "redux";

export type DataState = ReadonlyArray<Album>;

const dataReducer = (state: DataState = [], action: Action): DataState => {
  switch (action.type) {
    case getType(setAlbumsList):
      return action.payload;
    default:
      return state;
  }
};

export type MetadataState = Readonly<{
  isLoading: boolean;
}>;

const initialMetadataState: MetadataState = {
  isLoading: false
};

const metadataReducer = (
  state: MetadataState = initialMetadataState,
  action: Action
): MetadataState => {
  switch (action.type) {
    case getType(loadAlbumsList.request):
      return { ...state, isLoading: true };

    case getType(loadAlbumsList.success):
    case getType(loadAlbumsList.failure):
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export type State = Readonly<{
  data: DataState;
  metadata: MetadataState;
}>;

export default combineReducers<State, Action>({
  data: dataReducer,
  metadata: metadataReducer
});
