import React, { useContext, useEffect, useState, VFC } from "react";
import { useRouter } from "next/router";

import { Context as TokenContext } from "store/token";
import { Context as SongContext } from "store/song";

import styles from "./styles.module.scss";
import AlbumCard from "components/Card/Album";

//アルバムを表示
const AlbumLayout = () => {
  const router = useRouter();
  const { handleToken } = useContext(TokenContext);
  const { searched, setSearched } = useContext(SongContext);

  /**
   * spotifyAPIから曲を検索.
   */
  const handleSearch = handleToken((args) => {
    fetch(`/api/spotify/${args?.access_token}/album/${args.search}`)
      .then((res) => res.json())
      .then((body) => setSearched(body))
      .catch((err) => console.error(err));
  });

  //パラメーターをもとに曲を検索。
  useEffect(() => {
    if (router?.query?.album) handleSearch(router?.query?.album);
  }, [router?.query?.album]);

  if (!router.query.album || searched?.length === 0) return null;

  return (
    <div className={styles["album"]}>
      <img src={searched?.images[0].url} />

      <div className={styles["album_info"]}>
        <div className={styles["names"]}>
          <p className={styles["names__track"]}>{searched.name}</p>
          <p className={styles["names__artist"]}>{searched.artists[0].name}</p>
        </div>
        <div className={styles["cards"]}>
          {searched?.tracks?.items?.map((item) => (
            <AlbumCard
              {...item}
              img={searched?.images[0]?.url}
              albumId={searched?.id}
              key={item?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumLayout;
