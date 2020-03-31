import React from "react";
import styles from "./violation-class.module.scss";

const ViolationClass = ({
  violationClass,
  type = "violation",
  open = "false"
}) => {
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

    if (type === "apartment") {
      return styles.violation_class__apartment;
    }

    if (open === "Open") {
      return styles.violation_class__status_open;
    }

    return styles.violation_class__status_close;
  };

  const getLabel = violationClass => {
    if (type === "violation") {
      return `Class ${violationClass}`;
    }

    if (type === "apartment") {
      return `Apartment ${violationClass}`;
    }

    if (type === "status" && open === "Close") {
      return "Closed";
    }

    if (type === "status" && open === "Open") {
      return "Open";
    }
  };

  return <span className={getClass()}>{getLabel(violationClass)}</span>;
};

export default ViolationClass;
