import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as Types from "Types";
//separate local imports from dependencies
import "./index.css";
import { albumListComponentMounted } from "../actions";

interface AlbumModel {
  name: string;
  coverImageUrl: string;
}

interface Props {
  albums: ReadonlyArray<AlbumModel>;
  isLoading: boolean;
  onMount: () => void;
}

interface State {
  likedAlbums: Set<number>;
  searchPhrase: string;
}

class ListComponent extends Component<Props, State> {
  state = {
    likedAlbums: new Set<number>(),
    searchPhrase: ""
  };

  componentDidMount() {
    this.props.onMount();
  }

  likeAlbum(index: number) {
    this.state.likedAlbums.add(index);
    this.forceUpdate();
  }

  unlikeAlbum(index: number) {
    this.state.likedAlbums.delete(index);
    this.forceUpdate();
  }

  search(phrase: string) {
    this.setState({ searchPhrase: phrase });
  }

  render() {
    //Destructure props for readability
    const { 
      albums, 
      isLoading 
    } = this.props;
    return (
      <div className={"Layout"}>
        {isLoading && (
          <div className={"Layout__splash--screen"}>Loading...</div>
        )}
        {!isLoading && albums.length === 0 ? (
          <div className={"Layout__splash--screen"}>Nothing to show</div>
        ) : (
          <Fragment>
            <input
              className={"Layout__search"}
              value={this.state.searchPhrase}
              onChange={(e) => this.search(e.target.value)}
              placeholder={"Search album"}
            />
            {albums
              .filter(album => album.name.includes(this.state.searchPhrase)) //add toLowerCase() method to search for a word regardless of letter size
              .map((album, index) => ( //add method to prevent double display of searched positions
                <div className={"Card"} key={index}>
                  <img className={"Card__image"} src={album.coverImageUrl} />
                  <h2 className={"Card__text"}>{album.name}</h2>
                  <div className={"Card__like"}>
                    {this.state.likedAlbums.has(index) ? ( //save state in local storage to remember which position user likes
                      <i
                        onClick={() => this.unlikeAlbum(index)}
                        className={"Card__like__heart fas fa-heart"}
                      />
                    ) : (
                      <i
                        onClick={() => this.likeAlbum(index)}
                        className={"Card__like__heart far fa-heart"}
                      />
                    )}
                  </div>
                </div>
              ))}
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(
  (state: Types.RootState) => {
    return {
      albums: state.albums.data.map(
        (item): AlbumModel => ({
          name: item.title,
          coverImageUrl: item.coverImageUrl
        })
      ),
      isLoading: state.albums.metadata.isLoading
    };
  },
  (dispatch: Dispatch<Types.RootAction>) => {
    return {
      onMount: () => dispatch(albumListComponentMounted())
    };
  }
)(ListComponent);
