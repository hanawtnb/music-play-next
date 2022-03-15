import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";

const Form = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const onSubmitForm = (event) => {
    event.preventDefault();
    router.push({ pathname: "/", query: { search } }, undefined, {
      shallow: true,
    });
  };
  return (
    <form
      action="submit"
      onSubmit={onSubmitForm}
      className={styles["search_bar"]}
    >
      <input
        type="text"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
        placeholder="search..."
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default Form;
