import React, { useContext, VFC } from "react";

import { Context as PlaylistContext } from "store/playlist";

import styles from "./styles.module.scss";
import { RiMenuAddLine } from "react-icons/ri";

type Props = {
  curSong: any;
};

/**
 * プレイリストに追加.
 * @param props - 再生中の曲
 * @returns - プレイリストに追加ボタン
 */
const AddCue: VFC<Props> = (props) => {
  const { curSong } = props;
  const { addPlaylist } = useContext(PlaylistContext);

  return (
    <button
      className={styles["add-button"]}
      type="button"
      onClick={() => addPlaylist(curSong)}
    >
      <RiMenuAddLine />
    </button>
  );
};

export default AddCue;
