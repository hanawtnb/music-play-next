import React from "react";

import Form from "components/Search";

import styles from "./styles.module.scss";

const NavBar = () => (
  <div className={styles["nav"]}>
    <Form />
  </div>
);

export default NavBar;
