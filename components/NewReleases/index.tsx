import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useSWR from "swr";

import { Item } from "../../types/types";
import styles from "./styles.module.scss";

//fetcher関数の作成
const fetcher = (url: string) => fetch(url).then((r) => r.json());

// スケルトンローディング
const LoadingCard = () => {
  return (
    <div className={styles["loading"]}>
      {[...Array(20)].map((index) => (
        <div className={styles["loading__card"]} key={index}></div>
      ))}
    </div>
  );
};

const NewCard = dynamic(() => import("components/Card/New"), {
  loading: () => <LoadingCard />,
});

const NewReleases = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/spotify/newReleases`, fetcher);

  if (!data) return <LoadingCard />;

  if (router.query.search || router.query.album) return null;

  return (
    <div>
      <div className={styles["page"]}>
        <h4 className={styles["title"]}>New Releases</h4>

        {data.albums.items?.map((item: Item) => (
          <NewCard images={[]} key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
