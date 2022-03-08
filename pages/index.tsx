import ArtistCard from "components/Card/Artist";
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
    </div>
  );
};

export default Index;
