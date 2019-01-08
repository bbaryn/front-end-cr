import ITunesService from "./itunes-service";

export default () => {
  return {
    iTunesService: new ITunesService()
  };
};
