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
  const [playlist, setPlaylist] = useState(null);
  const { event, curSong, setCurSong, curAlbum } = useContext(SongContext);
  console.log("今のアルバム", curAlbum);

  const [isPaused, setIsPaused] = useState(false);
  const [, setDisabled] = useState(false);

  useEffect(() => {
    if (event?.getPlayerState() === 1) {
      setIsPaused(false);
    }
  }, []);

  // useEffect(() => {
  //   let playlist: any = localStorage.getItem("playlist");
  //   playlist = JSON.parse(playlist);
  //   setPlaylist(playlist);
  // }, []);
  // const arr = curAlbum?.tracks?.items.map((item: any) => item.name);
  // const curSongIndex = arr?.indexOf(curSong?.name);

  /**
   * 前の曲を再生
   */
  const playPrevSong = async () => {
    setDisabled(true);

    let prevSong =
      curAlbum?.tracks?.items?.[
        curAlbum?.tracks?.items?.findIndex(({ id }) => curSong?.id === id) - 1
      ];

    if (!prevSong?.videoId) {
      prevSong = {
        ...prevSong,
        videoId: await search(
          `${prevSong?.artists?.[0]?.name} - ${prevSong?.name} song`
        ),
      };
    }
    setCurSong(prevSong);
    setTimeout(() => setDisabled(false), 1000);
  };

  /**
   * 次の曲を再生
   */
  const playNextSong = async () => {
    setDisabled(true);

    let nextSong =
      curAlbum?.tracks?.items?.[
        curAlbum?.tracks?.items?.findIndex(({ id }) => curSong?.id === id) + 1
      ];

    if (!nextSong?.videoId) {
      nextSong = {
        ...nextSong,
        videoId: await search(
          `${nextSong?.artists?.[0]?.name} - ${nextSong?.name} song`
        ),
      };
    }
    setCurSong(nextSong);
    setTimeout(() => setDisabled(false), 1000);
  };

  return (
    <>
      <div className={styles["controller"]}>
        <div className={styles["controls"]}>
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
        <div>
          <DurationBar />
        </div>
      </div>
    </>
  );
};

export default Controls;
