import React, { useEffect, useState, createContext, useContext } from "react";

export const Context = createContext();

export const Store = ({ children }) => {
  const [curSong, setCurSong] = useState(null);
  return (
    <Context.Provider value={{ setCurSong, curSong }}>
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Store,
};
