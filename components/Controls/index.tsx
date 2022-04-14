import React, { useContext, useEffect, useState } from "react";
import { BsSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs";
import { VscDebugPause, VscPlayCircle } from "react-icons/vsc";
import { HiOutlinePause } from "react-icons/hi";
import DurationBar from "components/DurationBar";

import { Context as SongContext } from "store/song";

import styles from "./styles.module.scss";

//再生ボタンなどのコントローラー
const Controls = () => {
  const { event, nextSong, prevSong } = useContext(SongContext);

  // ポーズ状態
  const [, setIsPaused] = useState(false);

  return (
    <div className={styles["controller"]}>
      <div className={styles["controls"]}>
        <button
          onClick={prevSong}
          disabled={!event}
          className={styles["controls__skipBackBtn"]}
        >
          <BsSkipBackwardFill />
        </button>
        {event?.getPlayerState() === 1 ? (
          <button
            onClick={() => {
              event?.playVideo();
              setIsPaused(false);
            }}
            type="button"
            disabled={!event}
            className={styles["controls__playPauseBtn"]}
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
            className={styles["controls__playPauseBtn"]}
          >
            <HiOutlinePause />
          </button>
        )}
        <button
          onClick={nextSong}
          type="button"
          disabled={!event}
          className={styles["controls__skipBackBtn"]}
        >
          <BsSkipForwardFill />
        </button>
      </div>

      <DurationBar />
    </div>
  );
};

export default Controls;
