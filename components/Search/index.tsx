import React, { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";

const Form = () => {
  const timer = useRef(null);

  const router = useRouter();
  const [search, setSearch] = useState("");
  const onSubmitForm = (event) => {
    event.preventDefault();
    router.push({ pathname: "/", query: { search } }, undefined, {
      shallow: true,
    });
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
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
    <form onSubmit={onSubmitForm} className={styles["search"]}>
      <input type="text" onChange={handleChange} value={search} />
    </form>
  );
};

export default Form;
