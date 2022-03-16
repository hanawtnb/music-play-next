import React, { useContext, VFC } from "react";

import AddCue from "components/Button/AddCue";
import { Context as SongContext } from "store/song";
import search from "utils/youtubeSearch";

import styles from "./styles.module.scss";

type Props = {
  [key: string]: any;
  img: string;
  albumId: string;
};

//アルバムの曲を表示
const AlbumCard: VFC<Props> = (props) => {
  const { name, artists }: any = props;
  const { setCurSong, setCurAlbum, searched } = useContext(SongContext);

  /**
   * Youtubeで曲を検索.
   */
  const searchSong = async () => {
    const res = await search(`${artists?.[0]?.name} - ${name} song`);
    setCurSong({ ...props, videoId: res });
    setCurAlbum({
      ...searched,
      tracks: {
        items: searched?.tracks?.items.map((item) => ({
          ...item,
          img: searched?.images?.[0]?.url,
        })),
      },
    });
  };

  return (
    <>
      <button className={styles["card"]} onClick={searchSong} type="button">
        <div className={styles["card__name"]}>
          <span>{name}</span> &nbsp;- &nbsp;
          <span className={styles["card__name--artist"]}>
            {artists?.map(({ name }) => name)}
          </span>
        </div>
        <AddCue />
      </button>
    </>
  );
};

export default AlbumCard;
