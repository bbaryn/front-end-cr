import React, { Fragment } from "react";
import { Route, Switch } from "react-router";
import { AlbumDetails, TopAlbumsList } from "../modules/albums";
import NotFound from "./NotFound";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    font-family: Roboto, sans-serif;
    font-size: 16px;
  }
`;

export default () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={TopAlbumsList} />
        <Route path="/:id" component={AlbumDetails} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};
