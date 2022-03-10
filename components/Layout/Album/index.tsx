import React, { useContext, useEffect, useState, VFC } from "react";
import { useRouter } from "next/router";

import { Context as TokenContext } from "store/token";
import { Context as SongContext } from "store/song";
import search from "utils/youtubeSearch";

import styles from "./styles.module.scss";

//アルバムの曲を表示
const Card: VFC = (props) => {
  const { name, artists }: any = props;
  const { setCurSong } = useContext(SongContext);
  const [, setDisabled] = useState(false);

  /**
   * Youtubeで曲を検索.
   */
  const searchSong = async () => {
    setDisabled(true);
    const res = await search(`${artists?.[0]?.name} - ${name} song`);
    setCurSong({ ...props, videoId: res });
    setTimeout(() => setDisabled(false), 1000);
  };
  return (
    <button className={styles["song_card"]} onClick={searchSong} type="button">
      <div className={styles["song_info"]}>
        <span>{name}</span> &nbsp;- &nbsp;
        <span>{artists?.map(({ name }) => name)}</span>
      </div>
    </button>
  );
};

//アルバムを表示
const AlbumLayout = () => {
  const router = useRouter();
  const { handleToken } = useContext(TokenContext);
  const { searched, setSearched } = useContext(SongContext);

  /**
   * spotifyAPIから曲を検索.
   */
  const handleSearch = handleToken((args) => {
    fetch(`/api/spotify/${args?.access_token}/album/${args.search}`)
      .then((res) => res.json())
      .then((body) => setSearched(body))
      .catch((err) => console.error(err));
  });

  //パラメーターをもとに曲を検索。
  useEffect(() => {
    if (router?.query?.album) handleSearch(router?.query?.album);
  }, [router?.query?.album]);

  if (!router.query.album || searched?.length === 0) return null;

  return (
    <>
      <div className={styles["album_info"]}>
        <p>{searched.name}</p>
        <p>{searched.artists[0].name}</p>
        <img height={200} width={200} src={searched?.images[0].url} />
      </div>
      <div className={styles["songs"]}>
        {searched?.tracks?.items?.map((item) => (
          <Card
            {...item}
            img={searched?.images[0]?.url}
            albumId={searched?.id}
            key={item?.id}
          />
        ))}
      </div>
    </>
  );
};

export default AlbumLayout;
