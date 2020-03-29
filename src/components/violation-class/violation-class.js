import React from "react";
import styles from "./violation-class.module.scss";

const ViolationClass = ({ violationClass, type="violation", open = "false" }) => {
  const getClass = () => {
    if (type === "violation") {
      switch (violationClass) {
        case "A":
          return styles.violation_class__a;
        case "B":
          return styles.violation_class__b;
        case "C":
          return styles.violation_class__c;
        default:
          return styles.violation_class__default;
      }
    }
    
    if(type === "apartment") {
      return styles.violation_class__apartment;
    }

    if(open) {
      return styles.violation_class__status_open
    }
    
    return styles.violation_class__status_close

  };

  const getLabel = () => {
    if(type === "violation") {
      return "Class"
    }

    if(type === "apartment") {
      return "Apartment"
    }

    return ""
  }

  return <span className={getClass()}>{getLabel()} {violationClass}</span>;
};

export default ViolationClass;
