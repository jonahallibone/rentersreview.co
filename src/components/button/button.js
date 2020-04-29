/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link } from "react-router-dom";
import styles from "./button.module.scss";

const Button = ({
  type = "button",
  solid = false,
  externalLink = false,
  children,
  to = "",
  submit = false,
  className,
  onClick = () => {},
  ...rest
}) => {
  const buttonFill = solid ? styles.button_solid : styles.button;

  if (type === "link" && !externalLink) {
    return (
      <Link
        className={`${buttonFill} ${className}`}
        {...rest}
        to={to}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  if (type === "link" && externalLink) {
    return (
      <a className={`${buttonFill} ${className}`} {...rest} href={to}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      {...rest}
      className={`${buttonFill} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
