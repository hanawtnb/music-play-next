import React from "react";
import Link from "next/link";

import Form from "components/Search";

import styles from "./styles.module.scss";
const NavBar = () => {
  return (
    <div className={styles["nav"]}>
      <Link href="/" prefetch={false}>
        <a href="/">
          <h1>Home</h1>
        </a>
      </Link>

      <Form />
    </div>
  );
};

export default NavBar;
