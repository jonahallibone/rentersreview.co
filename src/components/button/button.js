import React from "react";
import { Link } from "react-router-dom";
import styles from "./button.module.scss";

const Button = ({
  type = "button",
  externalLink = false,
  children,
  to = "",
  submit = false,
  onClick = () => {}
}) => {
  if (type === "link" && !externalLink) {
    return <Link className={styles.button} to={to} onClick={onClick}>{children}</Link>;
  }

  if (type === "link" && externalLink) {
    return <a className={styles.button} href={to}>{children}</a>;
  }
   
  return <button type={type} className={styles.button} onClick={onClick}>{children}</button>;
  
  
};

export default Button;
