import React, { useEffect } from "react";
import styles from "./option-toggle.module.scss";

const OptionToggle = ({ options = [], onChange = () => {} }) => {

  useEffect(() => onChange(options.selected), []);

  return (
    <div className={styles.option_toggle}>
      {options.map(option => (
        <button
          key={option.name}
          className={
            option.selected
              ? styles.option_toggle__button__selected
              : styles.option_toggle__button
          }
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default OptionToggle;
