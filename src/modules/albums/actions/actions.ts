import { createAsyncAction, createStandardAction } from "typesafe-actions";
import {
  ALBUMS_LIST_COMPONENT_MOUNT,
  LOAD_ALBUMS_LIST_FAILURE,
  LOAD_ALBUMS_LIST_REQUEST,
  LOAD_ALBUMS_LIST_SUCCESS,
  SET_ALBUMS_LIST
} from "./action-types";
import { Album } from "../models";

export const loadAlbumsList = createAsyncAction(
  LOAD_ALBUMS_LIST_REQUEST,
  LOAD_ALBUMS_LIST_SUCCESS,
  LOAD_ALBUMS_LIST_FAILURE
)<void, Album[], Error>();

export const setAlbumsList = createStandardAction(SET_ALBUMS_LIST)<Album[]>();

export const albumListComponentMounted = createStandardAction(
  ALBUMS_LIST_COMPONENT_MOUNT
)<void>();
