import React, { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";

export const Context = createContext();

export const Store = ({ children }) => {
  const router = useRouter();

  const [playlist, setPlaylist] = useState([]);

  //localStorageからプレイリストを取得
  useEffect(() => {
    const storage = localStorage.getItem("playlist");
    if (storage) setPlaylist(JSON.parse(storage));
  }, [router]);

  // localStorageにプレイリストを格納
  const addPlaylist = (props) => {
    if (!props) return;
    const storage: any = localStorage.getItem("playlist");

    if (storage.find((item: any) => item.id === props.id)) return;

    if (storage) {
      localStorage.setItem(
        "playlist",
        JSON.stringify([...JSON.parse(storage), props])
      );
    } else {
      localStorage.setItem("playlist", JSON.stringify([props]));
    }

    setPlaylist((cur) => [...cur, props]);
  };

  const removePlaylist = (props: number) => {
    if (!props) return;
    const storage: any = localStorage.getItem("playlist");

    const newPlaylist = JSON.parse(storage).splice(props, 1);
    console.log("い", newPlaylist);
    setPlaylist(newPlaylist);
  };

  return (
    <Context.Provider value={{ playlist, addPlaylist, removePlaylist }}>
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Store,
};
