import React from "react";
import styles from "./homepage-search.module.scss";

const HomepageSearch = () => {
  return (
    <div className={styles.homepage_input__container}>
      <input type="text" className={styles.homepage_input__input} placeholder="123 Appleseed Lane" />
      <button className={styles.homepage_input__button}>Search</button>
    </div>
  )
};

export default HomepageSearch;