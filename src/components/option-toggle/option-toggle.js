import React from "react";
import styles from "./option-toggle.module.scss";

const OptionToggle = ({
  options = [],
  value = null,
  onChange = () => {},
}) => {
  return (
    <div className={styles.option_toggle}>
      {options.map(option => (
        <button
          type="button"
          key={option.name}
          onClick={() => onChange(option.name)}
          className={`${
            value === option.name
              ? styles.option_toggle__button__selected
              : ""
          } ${styles.option_toggle__button}`}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default OptionToggle;
