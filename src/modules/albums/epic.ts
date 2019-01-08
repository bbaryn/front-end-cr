import { combineEpics, Epic } from "redux-observable";
import { filter, take, mapTo, mergeMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import * as Types from "Types";
import {
  albumListComponentMounted,
  loadAlbumsList,
  setAlbumsList
} from "./actions";
import { Album } from "./models";
import { of } from "rxjs";

type TypedEpic = Epic<
  Types.RootAction,
  Types.RootAction,
  Types.RootState,
  Types.Services
>;

const loadAlbumsOnMountEpic: TypedEpic = action$ =>
  action$.pipe(
    filter(isActionOf(albumListComponentMounted)),
    take(1),
    mapTo(loadAlbumsList.request())
  );

const loadAlbumsListRequestEpic: TypedEpic = (action$, _, { iTunesService }) =>
  action$.pipe(
    filter(isActionOf(loadAlbumsList.request)),
    mergeMap(iTunesService.getTopAlbums),
    map(response =>
      response.feed.entry.map(
        (item): Album => ({
          id: item.id.attributes["im:id"],
          author: item["im:artist"].label,
          coverImageUrl: item["im:image"][2].label,
          thumbnailUrl: item["im:image"][0].label,
          title: item["im:name"].label
        })
      )
    ),
    map(loadAlbumsList.success),
    catchError(error => of(loadAlbumsList.failure(error)))
  );

const setAlbumsOnLoadSuccessEpic: TypedEpic = action$ =>
  action$.pipe(
    filter(isActionOf(loadAlbumsList.success)),
    map(action => action.payload),
    map(setAlbumsList)
  );

export default combineEpics(
  loadAlbumsOnMountEpic,
  loadAlbumsListRequestEpic,
  setAlbumsOnLoadSuccessEpic
);
