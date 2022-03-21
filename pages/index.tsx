import React, { useContext } from "react";
import type { NextPage } from "next";

import AlbumLayout from "components/Layout/Album";
import SearchLayout from "components/Card/Artist";
import NavBar from "components/NavBar";
import Player from "components/Player";
import PlayerBar from "components/PlayerBar";
import NewReleases from "components/NewReleases";
import { Context as TokenContext } from "store/token";

const MainPage: NextPage = () => {
  const { token } = useContext(TokenContext);
  return (
    <>
      <NavBar />

      <AlbumLayout />
      <SearchLayout />

      {token?.access_token && <NewReleases {...token} />}

      <Player />
      <PlayerBar />
    </>
  );
};

export default MainPage;
