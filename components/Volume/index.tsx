import React, { useContext, useState } from "react";
import { BsFillVolumeMuteFill, BsVolumeUp } from "react-icons/bs";
import ReactSlider from "react-slider";

import { Context as SongContext } from "store/song";
import styles from "./styles.module.scss";

const Volume = () => {
  const { event } = useContext(SongContext);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <>
      <div className={styles["volume"]}>
        <div className={styles["volume__tooltip_top"]}>
          {isMuted ? (
            <button
              onClick={() => {
                setIsMuted(false);
                event?.unMute();
              }}
            >
              <BsFillVolumeMuteFill />
            </button>
          ) : (
            <button
              onClick={() => {
                setIsMuted(true);
                event?.mute();
              }}
            >
              <BsVolumeUp />
            </button>
          )}

          <div className={styles["volume_tooltip"]}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Volume;
