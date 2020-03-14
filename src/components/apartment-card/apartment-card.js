import React from "react";
import styles from "./apartment-card.module.scss";

const ApartmentCardHeader = ({ children }) => (
  <header className={styles.apartment_card__header}>{children}</header>
);

const ApartmentCardContent = ({ children }) => (
  <section className={styles.apartment_card__content}>{children}</section>
);

const ApartmentCardFooter = ({ children }) => (
  <footer className={styles.apartment_card__footer}>{children}</footer>
);

const ApartmentCard = ({ children }) => {
  return <article className={styles.apartment_card}>{children}</article>;
};

export {
  ApartmentCard as default,
  ApartmentCardHeader,
  ApartmentCardContent,
  ApartmentCardFooter
};
