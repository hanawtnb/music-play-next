import { useRouter } from "next/router";
import Image from "next/image";
import React, { useContext, useEffect, useState, VFC } from "react";
import { Context as TokenContext } from "store/token";
import { Context as SearchContext } from "store/search";
import search from "store/search";

const Card: VFC = (props) => {
  const { name, artists }: any = props;

  return (
    <button type="button">
      <span>{name}</span> &nbsp;- &nbsp;
      <span>{artists?.map(({ name }) => name)}</span>
    </button>
  );
};

const AlbumLayout = () => {
  const router = useRouter();
  const { handleToken } = useContext(TokenContext);

  const [searched, setSearched]: any = useState([]);

  const handleSearch = handleToken((args) => {
    console.log(args);

    fetch(`/api/spotify/${args?.access_token}/album/${args.search}`)
      .then((res) => res.json())
      .then((body) => setSearched(body))
      .catch((err) => console.error(err));
  });

  console.log("fgh", searched);

  useEffect(() => {
    if (router?.query?.album) handleSearch(router?.query?.album);
  }, [router?.query?.album]);

  if (!router.query.album || searched?.length === 0) return null;

  return (
    <>
      <p>{searched.name}</p>
      <p>{searched.artists[0].name}</p>
      <Image height={200} width={200} src={searched?.images[0].url} />
      <div>
        {searched?.tracks?.items?.map((item) => (
          <Card
            {...item}
            img={searched?.images[2]?.url}
            albumId={searched?.id}
            key={item?.id}
          />
        ))}
      </div>
    </>
  );
};

export default AlbumLayout;
