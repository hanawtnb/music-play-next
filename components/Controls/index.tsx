import React, { useContext, useEffect, useState } from "react";
import { BsSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs";
import { VscDebugPause, VscPlayCircle } from "react-icons/vsc";

import DurationBar from "components/DurationBar";

import { Context as SongContext } from "store/song";

import styles from "./styles.module.scss";

//再生ボタンなどのコントローラー
const Controls = () => {
  const { event, nextSong, prevSong } = useContext(SongContext);
  // ポーズ状態
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (event?.getPlayerState() === 1) {
      setIsPaused(false);
    }
  }, []);

  return (
    <div className={styles["controller"]}>
      <div className={styles["controls"]}>
        <button onClick={prevSong} disabled={!event}>
          <BsSkipBackwardFill />
        </button>
        {isPaused ? (
          <button
            onClick={() => {
              event?.playVideo();
              setIsPaused(false);
            }}
            type="button"
            disabled={!event}
          >
            <VscPlayCircle />
          </button>
        ) : (
          <button
            onClick={() => {
              event?.pauseVideo();
              setIsPaused(true);
            }}
            type="button"
            disabled={!event}
          >
            <VscDebugPause />
          </button>
        )}
        <button onClick={nextSong} type="button" disabled={!event}>
          <BsSkipForwardFill />
        </button>
      </div>

      <DurationBar />
    </div>
  );
};

export default Controls;
