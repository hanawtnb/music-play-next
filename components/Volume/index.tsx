import React, { useContext } from "react";
import ReactSlider from "react-slider";

import { Context as SongContext } from "store/song";
import styles from "./styles.module.scss";

const Volume = () => {
  const { event } = useContext(SongContext);
  console.log(event);

  return (
    <>
      <ReactSlider
        onChange={(state) => event.setVolume(state)}
        className={styles["vertical-slider"]}
        thumbClassName={styles["thumb"]}
        trackClassName={styles["track"]}
        renderThumb={(props) => <div {...props} />}
        orientation="vertical"
        invert
        pearling
      />
    </>
  );
};

export default Volume;
