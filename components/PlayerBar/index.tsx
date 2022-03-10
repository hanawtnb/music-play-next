import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Context as SongContext } from "store/song";
import Volume from "components/Volume";
import DurationBar from "components/DurationBar";
import search from "utils/youtubeSearch";

import styles from "./styles.module.scss";
import { VscPlayCircle, VscDebugPause } from "react-icons/vsc";
import {
  BsVolumeUp,
  BsFillVolumeMuteFill,
  BsSkipForwardFill,
  BsSkipBackwardFill,
} from "react-icons/bs";

//再生ボタンなどのコントローラー
const Controls = () => {
  const { event, curSong, searched, setCurSong } = useContext(SongContext);

  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [, setDisabled] = useState(false);

  useEffect(() => {
    if (event?.getPlayerState() === 1) {
      setIsPaused(false);
    }
  }, []);

  const arr = searched?.tracks?.items.map((item: any) => item.name);
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

    const prevSong = searched?.tracks.items[prevSongIndex];
    const searchVideoId = await search(
      `${curSong?.artists?.[0]?.name} - ${prevSong?.name} song`
    );

    const info = searched?.tracks?.items[prevSongIndex];
    const img = searched?.images[0].url;

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

    const nextSong = searched?.tracks.items[nextSongIndex];
    const searchVideoId = await search(
      `${curSong?.artists?.[0]?.name} - ${nextSong?.name} song`
    );

    const info = searched?.tracks?.items[nextSongIndex];
    const img = searched?.images[0].url;

    setCurSong({
      ...info,
      img,
      videoId: searchVideoId,
    });
    setTimeout(() => setDisabled(false), 1000);
  };

  return (
    <>
      <div className={styles["controls"]}>
        <div className={styles["play_icons"]}>
          <BsSkipBackwardFill
            className={styles["svg"]}
            onClick={playPrevSong}
          />
          {isPaused ? (
            <VscPlayCircle
              className={styles["svg"]}
              onClick={() => {
                event?.playVideo();
                setIsPaused(false);
              }}
            />
          ) : (
            <VscDebugPause
              className={styles["svg"]}
              onClick={() => {
                event?.pauseVideo();
                setIsPaused(true);
              }}
            />
          )}
          <BsSkipForwardFill className={styles["svg"]} onClick={playNextSong} />
        </div>
        <div className={styles["duration_bar"]}>
          <DurationBar />
        </div>
        <div className={styles["volume"]}>
          <div className={styles["tooltip_top"]}>
            {isMuted ? (
              <BsFillVolumeMuteFill
                onClick={() => {
                  setIsMuted(false);
                  event?.unMute();
                }}
              />
            ) : (
              <BsVolumeUp
                onClick={() => {
                  setIsMuted(true);
                  event?.mute();
                  console.log(isMuted);
                }}
              />
            )}

            <div className={styles["tooltip"]}>
              <Volume />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PlayerBar = () => {
  const { curSong } = useContext(SongContext);

  return (
    <>
      <div className={styles["player_bar"]}>
        <div className={styles["controller_button_wrapper"]}>
          {curSong && (
            <div className={styles["current_song"]}>
              <img src={curSong?.img} />
              <div className={styles["song_info"]}>
                <p>{curSong?.name}</p>
                <p>{curSong?.artists?.map(({ name }) => name)}</p>
              </div>
            </div>
          )}
          <Controls />
        </div>
      </div>
    </>
  );
};

export default PlayerBar;
