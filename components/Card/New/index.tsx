import React from "react";
import type { FC } from "react";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";

type Props = {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
  artists: {
    name: string;
  }[];
};

const Card: FC<Props> = ({ id, name, images, artists }) => {
  const router = useRouter();
  return (
    <div key={id}>
      <div
        className={styles["card"]}
        onClick={() =>
          router.push({ pathname: "/", query: { album: id } }, undefined, {
            shallow: true,
          })
        }
      >
        <div className={styles["album"]}>
          <div className={styles["info"]}>
            <p className={styles["info__name"]}>{name}</p>
            <p>{artists[0].name}</p>
          </div>
          <img src={images[0].url} />
        </div>
      </div>
    </div>
  );
};

export default Card;
