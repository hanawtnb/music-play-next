import React, { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

export const Context: any = createContext(null);

export const Store: any = ({ children }) => {
  const router = useRouter();

  const [searched, setSearched] = useState(null);

  const handleSearch = (search) => {
    fetch(`/api/spotify/artist/${search}`)
      .then((res) => res.json())
      .then(({ tracks }) => setSearched(tracks))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (router?.query?.search) handleSearch(router.query?.search);
  }, [router?.query?.search]);

  return <Context.Provider value={{ searched }}>{children}</Context.Provider>;
};

export default {
  Context,
  Store,
};
