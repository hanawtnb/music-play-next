import React, { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";

const Form = () => {
  const timer = useRef(null);
  const router = useRouter();
  // 検索
  const [search, setSearch] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target?.value);

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      if (!event?.target?.value) {
        router.push("/");
        return;
      }

      router.push(
        { pathname: "/", query: { search: event?.target?.value } },
        undefined,
        {
          shallow: true,
        }
      );
    }, 500);
  };

  return (
    <form className={styles["search"]}>
      <input
        placeholder="Search..."
        type="text"
        onChange={handleChange}
        value={search}
      />
    </form>
  );
};

export default Form;
