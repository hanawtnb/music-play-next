import { useRouter } from "next/router";
import React, { useEffect, useState, createContext, useContext } from "react";

import { Context as TokenContext } from "./token";

export const Context = createContext();

export const Store = ({ children }) => {
  const router = useRouter();

  const { token } = useContext(TokenContext);

  const [searched, setSearched] = useState(null);

  const handleSearch = (search) => {
    fetch(`/api/spotify/${token?.access_token}/artist/${search}`)
      .then((res) => res.json())
      .then(({ tracks }) => setSearched(tracks))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (router?.query?.search) handleSearch(router.query.search);
  }, [router?.query?.search]);

  return <Context.Provider value={{ searched }}>{children}</Context.Provider>;
};

export default {
  Context,
  Store,
};
