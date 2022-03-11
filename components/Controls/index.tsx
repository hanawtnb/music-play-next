import React, { useContext, useEffect, useState } from "react";

import search from "utils/youtubeSearch";
import { Context as SongContext } from "store/song";
import DurationBar from "components/DurationBar";
import Volume from "components/Volume";

import styles from "./styles.module.scss";
import { BsSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs";
import { VscDebugPause, VscPlayCircle } from "react-icons/vsc";

//再生ボタンなどのコントローラー
const Controls = () => {
  const { event, curSong, searched, setCurSong, curAlbum } =
    useContext(SongContext);

  const [isPaused, setIsPaused] = useState(false);

  const [, setDisabled] = useState(false);

  useEffect(() => {
    if (event?.getPlayerState() === 1) {
      setIsPaused(false);
    }
  }, []);

  const arr = curAlbum?.tracks?.items.map((item: any) => item.name);
  const curSongIndex = arr?.indexOf(curSong?.name);

  /**
   * 前の曲を再生
   */
  const playPrevSong = async () => {
    setDisabled(true);

    let prevSongIndex = 0;
    if (curSongIndex === 0) {
      prevSongIndex = arr.length - 1;
    } else {
      prevSongIndex = curSongIndex - 1;
    }

    const prevSong = curAlbum?.tracks.items[prevSongIndex];
    const searchVideoId = await search(
      `${curSong?.artists?.[0]?.name} - ${prevSong?.name} song`
    );

    const info = curAlbum?.tracks?.items[prevSongIndex];
    const img = curAlbum?.images[0].url;

    setCurSong({ ...info, img, videoId: searchVideoId });
    setTimeout(() => setDisabled(false), 1000);
  };

  /**
   * 次の曲を再生
   */
  const playNextSong = async () => {
    setDisabled(true);

    let nextSongIndex = 0;
    if (curSongIndex === arr.length - 1) {
      nextSongIndex = 0;
    } else {
      nextSongIndex = curSongIndex + 1;
    }

    const nextSong = curAlbum?.tracks.items[nextSongIndex];
    const searchVideoId = await search(
      `${curSong?.artists?.[0]?.name} - ${nextSong?.name} song`
    );

    const info = curAlbum?.tracks?.items[nextSongIndex];
    const img = curAlbum?.images[0].url;

    setCurSong({
      ...info,
      img,
      videoId: searchVideoId,
    });
    setTimeout(() => setDisabled(false), 1000);
  };

  return (
    <>
      <div className={styles["controller"]}>
        <div className={styles["controller_controls"]}>
          <button onClick={playPrevSong}>
            <BsSkipBackwardFill />
          </button>
          {isPaused ? (
            <button
              onClick={() => {
                event?.playVideo();
                setIsPaused(false);
              }}
            >
              <VscPlayCircle />
            </button>
          ) : (
            <button
              onClick={() => {
                event?.pauseVideo();
                setIsPaused(true);
              }}
            >
              <VscDebugPause />
            </button>
          )}
          <button onClick={playNextSong}>
            <BsSkipForwardFill />
          </button>
        </div>
        <div className={styles["duration_bar"]}>
          <DurationBar />
        </div>
        <Volume />
      </div>
    </>
  );
};

export default Controls;
