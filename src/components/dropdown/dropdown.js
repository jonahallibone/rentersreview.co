import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./dropdown.module.scss";

const Dropdown = ({
  children,
  title,
  alignment = "right",
  size = "normal",
  background = "white",
  disabled = false,
  border = true,
  ...rest
}) => {
  const focusStyle = styles.dropdown__focus;
  const [focus, setFocus] = useState(false);

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      setFocus(!focus);
    }
  };

  const getFocusClass = useMemo(() => {
    if (focus) {
      return focusStyle;
    }
    return "";
  }, [focus, focusStyle]);

  const getBackground = useMemo(() => {
    if (background === "blue") {
      return styles.dropdown__blue_bg;
    }

    return "";
  }, [background]);

  const getSize = useMemo(() => {
    if (size === "small") {
      return styles.dropdown__size__small;
    }

    return "";
  }, [size]);

  const getDisabled = useMemo(() => {
    if (disabled) {
      return styles.dropdown__disabled;
    }

    return "";
  }, [disabled]);

  const getBorderClass = useMemo(() => {
    if (!border) {
      return styles.no_border;
    }
  }, [border]);

  return (
    <div
      {...rest}
      tabIndex="0"
      role="button"
      onKeyPress={handleKeyDown}
      onClick={() => (!disabled ? setFocus(!focus) : undefined)}
      onBlur={() => setFocus(false)}
      className={`
      ${styles.dropdown}
      ${getFocusClass}
      ${getBorderClass}
      ${getBackground}
      ${getSize}
      ${getDisabled}`}
    >
      <span>{title}</span>
      <span className={styles.dropdown__icon}>
        <i className="fas fa-chevron-down" />
      </span>
      <ul
        className={`${styles.dropdown__ul} ${
          alignment === "right"
            ? styles.dropdown__ul__right
            : styles.dropdown__ul__left
        }`}
      >
        {children}
      </ul>
    </div>
  );
};

const Option = ({ children, ...rest }) => (
  <li className={styles.dropdown__li} {...rest}>
    {children}
  </li>
);

const OptionLink = ({ children, to }) => (
  <Link to={to} className={styles.dropdown__li}>
    {children}
  </Link>
);

export { Dropdown as default, Option, OptionLink };
