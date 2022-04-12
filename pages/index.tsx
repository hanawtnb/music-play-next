import React, { useContext } from "react";
import type { NextPage } from "next";

import AlbumLayout from "components/Layout/Album";
import SearchLayout from "components/Card/Artist";
import NavBar from "components/NavBar";
import Player from "components/Player";
import PlayerBar from "components/PlayerBar";
import NewReleases from "components/NewReleases";
import { Context as TokenContext } from "store/token";
import clientPromise from "lib/mongodb";

const MainPage: NextPage = (props) => {
  const { token } = useContext(TokenContext);
  console.log(props);
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

export async function getServerSideProps(context) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default MainPage;
