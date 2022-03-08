import React, { useEffect, useState, createContext, useContext } from "react";

export const Context = createContext();

export const Store = ({ children }) => {
  const [searched, setSearched] = useState([]);

  return <Context.Provider value={{ searched }}>{children}</Context.Provider>;
};

export default {
  Context,
  Store,
};
