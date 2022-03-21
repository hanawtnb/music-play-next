import React, { useContext, useEffect, useState } from "react";
import ReactSlider from "react-slider";

import { Context as SongContext } from "store/song";
import styles from "./styles.module.scss";

// 再生バー
const DurationBar = () => {
  const { event, curSong } = useContext(SongContext);
  // 再生時間
  const [duration, setDuration] = useState(0);
  // 現在の再生時間
  const [time, setTime] = useState(0);

  // 現在の再生時間をセット
  useEffect(() => {
    const timer = setInterval(() => setTime(event?.getCurrentTime()), 500);
    return () => clearInterval(timer);
  }, [curSong, event]);

  // 再生時間をセット
  useEffect(() => {
    setDuration(event?.getDuration());
  }, [event]);

  return (
    <>
      <div>
        <ReactSlider
          onChange={(state) => event?.seekTo(state)}
          className={styles["vertical-slider"]}
          thumbClassName={styles["thumb"]}
          trackClassName={styles["track"]}
          renderThumb={(props) => <div {...props} />}
          max={Number(duration)}
          value={time}
          disabled={!event}
        />
      </div>
    </>
  );
};

export default DurationBar;
