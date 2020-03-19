import React from "react";
import { Link } from "react-router-dom";
import styles from "./button.module.scss";

const Button = ({
  type = "button",
  externalLink = false,
  children,
  to = "",
  submit = false,
  className,
  onClick = () => {},
  ...rest
}) => {
  if (type === "link" && !externalLink) {
    return <Link className={`${styles.button} ${className}`} {...rest} to={to} onClick={onClick}>{children}</Link>;
  }

  if (type === "link" && externalLink) {
    return <a className={`${styles.button} ${className}`} {...rest} href={to}>{children}</a>;
  }
   
  return <button type={type} {...rest } className={`${styles.button} ${className}`} onClick={onClick}>{children}</button>;
  
  
};

export default Button;
