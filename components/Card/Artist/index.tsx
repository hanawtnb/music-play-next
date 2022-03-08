import React, { useContext } from "react";
import { Context as SearchContext } from "store/search";
import Image from "next/image";

const ArtistCard = () => {
  const { searched } = useContext(SearchContext);
  console.log("これ", searched);

  return (
    <>
      {searched?.items?.map((items: any) => (
        <div key={items.id}>
          <p>{items.name}</p>
          <p>{items.artists[0].name}</p>
          <Image width={200} height={200} src={items.album.images[0].url} />
        </div>
      ))}
    </>
  );
};

export default ArtistCard;
