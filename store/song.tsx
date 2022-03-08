import React, { useEffect, useState, createContext, useContext } from "react";

export const Context = createContext();

export const Store = ({ children }) => {
  const [curSong, setCurSong] = useState(null);
  const [event, setEvent] = useState(null);

  return (
    <Context.Provider value={{ setCurSong, curSong, setEvent }}>
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Store,
};
