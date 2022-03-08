import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Context as TokenContext } from "store/token";

const AlbumLayout = () => {
  const router = useRouter();
  const { handleToken } = useContext(TokenContext);

  const [searched, setSearched] = useState(null);

  const handleSearch = handleToken((args) => {
    console.log(args);

    fetch(`/api/spotify/${args?.access_token}/album/${args.search}`)
      .then((res) => res.json())
      .then(({ tracks }) => setSearched(tracks))
      .catch((err) => console.error(err));
  });

  console.log("fgh", searched);

  useEffect(() => {
    if (router?.query?.album) handleSearch(router?.query?.album);
  }, [router?.query?.album]);

  if (!router.query.album) return null;

  return <div>index</div>;
};

export default AlbumLayout;
