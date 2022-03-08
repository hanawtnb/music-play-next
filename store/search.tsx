import { useRouter } from "next/router";
import React, { useEffect, useState, createContext, useContext } from "react";

import { Context as TokenContext } from "./token";

export const Context = createContext();

export const Store = ({ children }) => {
  const router = useRouter();
  const [curSong, setCurSong] = useState(null);

  const { token, handleToken } = useContext(TokenContext);

  const [searched, setSearched] = useState(null);

  const handleSearch = handleToken((args) => {
    fetch(`/api/spotify/${args?.access_token}/artist/${args.search}`)
      .then((res) => res.json())
      .then(({ tracks }) => setSearched(tracks))
      .catch((err) => console.error(err));
  });

  useEffect(() => {
    if (router?.query?.search) handleSearch(router.query?.search);
  }, [router?.query?.search]);

  return (
    <Context.Provider
      value={{ searched, setCurSong: (id) => setCurSong(id), curSong }}
    >
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Store,
};
