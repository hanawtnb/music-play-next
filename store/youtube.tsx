import React, { createContext } from "react";
import useSWR, { useSWRConfig } from "swr";
import search from "utils/youtubeSearch";
import fetch from "unfetch";

export const Context: any = createContext(null);

// fetcher関数の作成
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const Store: any = ({ children }) => {
  const { data } = useSWR(`/api/db/get`, fetcher);

  // const { mutate } = useSWR(`/api/db/create`, fetcher);

  // const { mutate } = useSWRConfig();

  const getId = async (props) => {
    if (data?.find(({ searchStr }) => searchStr === props)) {
      return data?.find(({ searchStr }) => searchStr === props)?.videoId;
    }

    const res = await search(props);
    // mutate({ searchStr: props, videoId: res }, false);
    fetch("/api/db/create", {
      method: "POST",
      body: JSON.stringify({
        searchStr: props,
        videoId: res,
      }),
    });
    return res;
  };

  return <Context.Provider value={{ getId }}>{children}</Context.Provider>;
};

export default {
  Context,
  Store,
};
