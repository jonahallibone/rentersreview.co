import React from "react";
import styles from "./claim-apartment.module.scss";
import Button from "../button/button";

const ClaimApartment = () => {
  return (
    <div className={styles.claim_apartment}>
      <h5>Do you manage or own this Building?</h5>
      <input type="text" placeholder="example@example.com" className={styles.claim_input} />
      <Button solid style={{width: "100%"}}>Claim Building</Button>
    </div>
  )
};

export default ClaimApartment;