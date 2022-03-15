import React, { useEffect, useState, createContext, useContext } from "react";

export const Context = createContext();

export const Store = ({ children }) => {
  const [curSong, setCurSong] = useState(null);
  const [curAlbum, setCurAlbum] = useState(null);
  const [event, setEvent] = useState(null);
  const [searched, setSearched] = useState([]);

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
