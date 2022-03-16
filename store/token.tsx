import React, { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/router";

export const Context: any = createContext();

export const Store: any = ({ children }) => {
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

  const handleToken = (next) => async (args) => {
    // Call this function before interacting with spotify api to check if access_token is valid.
    let res = token;
    if (!res || (new Date() as any) - res?.createdAt >= 3600000) {
      res = await fetch("/api/spotify/token")
        .then((res) => res.json())
        .catch((err) => {
          throw err;
        });
      if (!res) return;
      // Set createdAt because expires in 3600 (1 hour), check above if expired.
      setToken({ ...res, createdAt: new Date() });
    }
    return next({ search: args, ...res });
  };

  return (
    <Context.Provider value={{ token, handleToken }}>
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Store,
};
