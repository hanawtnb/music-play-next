import React, { useState, createContext } from "react";

import search from "utils/youtubeSearch";

export const Context = createContext();

export const Store = ({ children }) => {
  const [curSong, setCurSong] = useState(null);
  const [curAlbum, setCurAlbum] = useState(null);
  const [event, setEvent] = useState(null);
  const [searched, setSearched] = useState([]);

  const prevSong = async () => {
    let prevSong =
      curAlbum?.tracks?.items?.[
        curAlbum?.tracks?.items?.findIndex(({ id }) => curSong?.id === id) - 1
      ];

    if (!prevSong?.videoId) {
      prevSong = {
        ...prevSong,
        videoId: await search(
          `${prevSong?.artists?.[0]?.name} - ${prevSong?.name} song`
        ),
      };
    }
    setCurSong(prevSong);
  };

  const nextSong = async () => {
    let nextSong =
      curAlbum?.tracks?.items?.[
        curAlbum?.tracks?.items?.findIndex(({ id }) => curSong?.id === id) + 1
      ];

    if (!nextSong?.videoId) {
      nextSong = {
        ...nextSong,
        videoId: await search(
          `${nextSong?.artists?.[0]?.name} - ${nextSong?.name} song`
        ),
      };
    }
    setCurSong(nextSong);
  };

  return (
    <Context.Provider
      value={{
        setCurSong,
        curSong,
        curAlbum,
        setCurAlbum,
        setEvent,
        event,
        searched,
        setSearched,

        nextSong,
        prevSong,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Store,
};
