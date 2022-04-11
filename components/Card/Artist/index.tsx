import React, { useContext } from "react";
import { useRouter } from "next/router";

import { Context as SearchContext } from "store/search";
import { Item } from "../../../types/types";

import styles from "./styles.module.scss";

/**
 * 検索結果を表示.
 * @returns - 曲名とアルバムイメージのカード
 */
const ArtistCard = () => {
  const router = useRouter();
  const { searched } = useContext(SearchContext);

  //searchクエリがあれば検索
  if (searched?.length === 0 || !router.query?.search) return null;

  return (
    <div className={styles["page"]}>
      {searched?.items?.map((items: Item) => (
        <div
          className={styles["card"]}
          key={items.id}
          onClick={() =>
            router.push(
              { pathname: "/", query: { album: items.album.id } },
              undefined,
              { shallow: true }
            )
          }
        >
          <div className={styles["album"]}>
            <div className={styles["info"]}>
              <p className={styles["info__name"]}>{items.name}</p>
              <p>{items.artists[0].name}</p>
            </div>
            <img src={items.album.images[0].url} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default ArtistCard;
