import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Context as SongContext } from "store/song";
import Controls from "components/Controls";

import styles from "./styles.module.scss";
import Volume from "components/Volume";
import AddCue from "components/Button/AddCue";

const PlayerBar = () => {
  const { curSong } = useContext(SongContext);
  return (
    <div className={styles["bar"]}>
      <div className={styles["controls"]}>
        {curSong && (
          <div className={styles["playing"]}>
            <img src={curSong?.img} />
            <div className={styles["playing__name"]}>
              <p>{curSong?.name}</p>
              <p>{curSong?.artists?.map(({ name }) => name)}</p>
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
