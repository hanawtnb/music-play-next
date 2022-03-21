import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";

const Form = () => {
  const timer = useRef(null);
  const router = useRouter();
  // 検索
  const [search, setSearch] = useState("");

  const handleChange = (e: any) => {
    setSearch(e?.target?.value);

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      if (!e?.target?.value) {
        router.push("/");
        return;
      }

      router.push(
        { pathname: "/", query: { search: e?.target?.value } },
        undefined,
        {
          shallow: true,
        }
      );
    }, 500);
  };

  return (
    <form className={styles["search"]}>
      <input type="text" onChange={handleChange} value={search} />
    </form>
  );
};

export default Form;
