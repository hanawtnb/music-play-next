import { useRouter } from "next/router";
import React, { useEffect, useState, createContext, useContext } from "react";

export const Context = createContext();

export const Store = ({ children }) => {
  const router = useRouter();

  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token || (new Date() as any) - token?.createdAt >= 3600000) {
      fetch("/api/spotify/token")
        .then((res) => res.json())
        .then((token) => {
          setToken({
            ...token,
            createdAt: new Date(),
          });
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [router]);

  return <Context.Provider value={{ token }}>{children}</Context.Provider>;
};

export default {
  Context,
  Store,
};
