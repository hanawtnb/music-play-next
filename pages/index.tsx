import React from "react";
import type { NextPage } from "next";
import AlbumLayout from "components/Layout/Album";
import SearchLayout from "components/Card/Artist";
import NavBar from "components/NavBar";
import Player from "components/Player";
import PlayerBar from "components/PlayerBar";
import NewReleases from "components/NewReleases";

const MainPage: NextPage = () => {
  return (
    <>
      <NavBar />

      <AlbumLayout />
      <SearchLayout />
      <NewReleases />

      <Player />
      <PlayerBar />
    </>
  );
};

export default MainPage;
