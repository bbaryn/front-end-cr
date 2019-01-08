import { combineEpics } from "redux-observable";

import { epic as albumsEpic } from "../modules/albums";

export default combineEpics(albumsEpic);
