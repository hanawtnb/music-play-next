import React, { useContext, useState, VFC } from "react";

import { Context as SongContext } from "store/song";
import { Context as YoutubeContext } from "store/youtube";
import type { Artist } from "../../../types/types";

import styles from "./styles.module.scss";

type Props = {
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
  const { getId } = useContext(YoutubeContext);

  /**
   * Youtubeで曲を検索.
   */
  const searchSong = async () => {
    setCurSong({
      ...props,
      videoId: await getId(`${artists?.[0]?.name} - ${name} song`),
    });
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
