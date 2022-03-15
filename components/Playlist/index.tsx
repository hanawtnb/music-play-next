import React, { useContext } from "react";

import { Context as PlaylistContext } from "store/playlist";
import { Context as SongContext } from "store/song";

import styles from "./styles.module.scss";

const Playlist = () => {
  const { setCurSong, setCurAlbum } = useContext(SongContext);
  const { playlist, removePlaylist } = useContext(PlaylistContext);

  return (
    <div className={styles["page"]}>
      <h4 className={styles["title"]}>My playlist</h4>
      {playlist ? (
        playlist?.map((item, index) => (
          <div
            className={styles["card"]}
            key={item.id}
            onClick={() => {
              setCurSong(item);
              setCurAlbum({ tracks: { items: playlist } });
            }}
          >
            <div className={styles["album"]}>
              <div className={styles["info"]}>
                <p className={styles["info__name"]}>{item.name}</p>
                <p>{item.artists[0].name}</p>
              </div>
              <button onClick={removePlaylist(index)}>delete</button>
              <img src={item.img} />
            </div>
          </div>
        ))
      ) : (
        <p>No tracks</p>
      )}
    </div>
  );
};

export default Playlist;
