import React, { useContext, useEffect, useState } from "react";
import ReactSlider from "react-slider";

import { Context as SongContext } from "store/song";
import styles from "./styles.module.scss";

const DurationBar = () => {
  const { event } = useContext(SongContext);
  const [duration, setDuration] = useState("0:00");

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
        />
      </div>
    </>
  );
};

export default DurationBar;
