import React, { useContext } from "react";
import { Context as SongContext } from "store/song";

import styles from "./styles.module.scss";
import { RiMenuAddLine } from "react-icons/ri";

const AddCue = () => {
  const { curSong } = useContext(SongContext);

  const addCue = () => {
    let storage: any = localStorage.getItem("playlist");
    if (storage) storage = JSON.parse(storage);

    localStorage.setItem(
      "playlist",
      JSON.stringify(storage?.length > 0 ? [...storage, curSong] : [curSong])
    );
  };

  return (
    <button className={styles["add-button"]} type="button" onClick={addCue}>
      <RiMenuAddLine />
    </button>
  );
};

export default AddCue;
