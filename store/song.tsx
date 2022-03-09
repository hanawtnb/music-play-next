import React, { useEffect, useState, createContext, useContext } from "react";

export const Context = createContext();

export const Store = ({ children }) => {
  const [curSong, setCurSong] = useState(null);
  const [event, setEvent] = useState(null);
  console.log(event);

  const [isPause, setIsPause] = useState(false);

  return (
    <Context.Provider
      value={{
        setCurSong,
        curSong,
        setEvent,
        event,
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
