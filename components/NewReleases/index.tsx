import router, { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";

import { Context as TokenContext } from "store/token";
import { Context as SongContext } from "store/song";

import styles from "./styles.module.scss";

const NewReleases = () => {
  const { handleToken } = useContext(TokenContext);
  const [newReleases, setNewRelease] = useState(null);
  const router = useRouter();
  const { searched } = useContext(SongContext);

  const handleGetNewRelease = handleToken((args: { access_token: any }) => {
    fetch(`/api/spotify/${args?.access_token}/newReleases`)
      .then((res) => res.json())
      .then(({ albums }) => setNewRelease(albums))
      .catch((err) => console.error(err));
  });
  console.log("にゅー", Object.keys(router.query).length === 0);

  //パラメーターをもとに曲を検索。
  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      handleGetNewRelease();
    }
  }, [Object.keys(router.query).length === 0]);

  if (router.query.search || router.query.album) return null;

  return (
    <div>
      <div className={styles["page"]}>
        <h4 className={styles["title"]}>New Releases</h4>
        {newReleases?.items?.map((items: any) => (
          <div
            className={styles["card"]}
            key={items.id}
            onClick={() =>
              router.push(
                { pathname: "/", query: { album: items.id } },
                undefined,
                { shallow: true }
              )
            }
          >
            <div className={styles["album"]}>
              <div className={styles["info"]}>
                <p className={styles["info__name"]}>{items.name}</p>
                <p>{items.artists[0].name}</p>
              </div>
              <img src={items.images[0].url} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
