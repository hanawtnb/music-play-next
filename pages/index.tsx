import ArtistCard from "components/Card/Artist";
import AlbumLayout from "components/Layout/Album";
import Player from "components/Player";
import Form from "components/Search";
import React, { useContext } from "react";
import search, { Context } from "store/search";

const Index = () => {
  const { searched } = useContext(Context);
  console.log(searched);

  return (
    <div>
      <Form />
      <ArtistCard />
      <AlbumLayout />

      <Player />
    </div>
  );
};

export default Index;
