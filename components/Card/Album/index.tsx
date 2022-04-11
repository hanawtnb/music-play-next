import React, { useContext, useState, VFC } from "react";

import { Context as SongContext } from "store/song";
import search from "utils/youtubeSearch";
import type { Artist } from "../../../types/types";

import styles from "./styles.module.scss";

type Props = {
  // img: string;
  // albumId: string;
  name: string;
  artists: Array<Artist>;
  id: string;
};

/**
 * アルバム曲を表示.
 * @param props - 曲名、アーティスト名、
 * @returns - アルバム収録曲のカード
 */
const AlbumCard: VFC<Props> = (props) => {
  const { name, artists, id } = props;

  const { curSong, setCurSong, setCurAlbum, searched } =
    useContext(SongContext);
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
      <button
        className={styles[curSong?.id === id ? "card--selected" : "card"]}
        onClick={searchSong}
        type="button"
      >
        <div className={styles["card__name"]}>
          <span>{name}</span> &nbsp;- &nbsp;
          <span className={styles["card__artist"]}>
            {artists?.map(({ name }) => name)}
          </span>
        </div>
      </button>
    </>
  );
};

export default AlbumCard;
