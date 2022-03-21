import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Context as SongContext } from "store/song";
import { Context as TokenContext } from "store/token";
import Controls from "components/Controls";
import Volume from "components/Volume";

import styles from "./styles.module.scss";

const PlayerBar = () => {
  const { curSong, setSearched, searched } = useContext(SongContext);
  const { handleToken } = useContext(TokenContext);
  const router = useRouter();

  /**
   * アーティストを検索.
   * @param name - アーティスト名
   */
  const search = (name: string) => {
    router.push({ pathname: "/", query: { search: name } }, undefined, {
      shallow: true,
    });
  };

  return (
    <div className={styles["bar"]}>
      <div className={styles["controls"]}>
        {curSong && (
          <div className={styles["playing"]}>
            <img src={curSong?.img} />
            <div>
              <p>{curSong?.name}</p>
              <p>
                {curSong?.artists?.map(({ name }) => (
                  <button key={name} type="button" onClick={() => search(name)}>
                    {name}
                  </button>
                ))}
              </p>
            </div>
          </div>
        )}
        <Controls />
        <div className={styles["options"]}>
          <Volume />
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
