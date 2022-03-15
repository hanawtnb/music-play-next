import React, { useContext, VFC } from "react";

import { Context as PlaylistContext } from "store/playlist";
import { Context as SongContext } from "store/song";

import styles from "./styles.module.scss";
import { RiMenuAddLine } from "react-icons/ri";

const AddCue: VFC = () => {
  const { curSong } = useContext(SongContext);
  const { addPlaylist } = useContext(PlaylistContext);

  return (
    <button
      className={styles["add"]}
      type="button"
      onClick={() => addPlaylist(curSong)}
    >
      <RiMenuAddLine />
    </button>
  );
};

export default AddCue;
