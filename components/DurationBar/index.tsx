import React, { useContext, useEffect, useState } from "react";
import ReactSlider from "react-slider";

import { Context as SongContext } from "store/song";
import styles from "./styles.module.scss";

const DurationBar = () => {
  const { event, curSong } = useContext(SongContext);

  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(event?.getCurrentTime()), 500);
    return () => clearInterval(timer);
  }, [curSong, event]);

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
        />
      </div>
    </>
  );
};

export default DurationBar;
