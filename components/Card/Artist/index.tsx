import React, { useContext } from "react";
import { Context as SearchContext } from "store/search";
import Image from "next/image";
import { useRouter } from "next/router";

const ArtistCard = () => {
  const router = useRouter();
  const { searched } = useContext(SearchContext);
  if (searched?.length === 0 || !router.query?.search) return null;

  return (
    <>
      {searched?.items?.map((items: any) => (
        <div
          key={items.id}
          onClick={() =>
            router.push(
              { pathname: "/", query: { album: items.album.id } },
              null,
              { shallow: true }
            )
          }
        >
          <p>{items.name}</p>
          <p>{items.artists[0].name}</p>
          <Image width={200} height={200} src={items.album.images[0].url} />
        </div>
      ))}
    </>
  );
};

export default ArtistCard;
