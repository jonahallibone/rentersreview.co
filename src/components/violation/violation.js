import React, { useState, useCallback, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import ViolationClass from "../violation-class/violation-class";
import styles from "./violation.module.scss";

const Violation = ({ violation }) => {
  const [expanded, setExpanded] = useState([]);

  const ellipsisText = useCallback(
    (description, maxLength, violationid) => {
      const { length } = description;
      if (length > maxLength && !expanded.find(el => el === violationid)) {
        const substr = description.substr(0, maxLength - 3);
        return `${substr}...`;
      }

      return description;
    },
    [expanded]
  );

  const expand = violationid => {
    if (expanded.find(el => el === violationid)) {
      setExpanded(state => state.filter(id => id !== violationid));
    } else {
      setExpanded(state => [...state, violationid]);
    }
  };

  return (
    <li
      role="option"
      aria-selected
      className={styles.violation__item}
      onKeyPress={() => {}}
      onClick={() => expand(violation.violationid)}
    >
      <Row className="justify-content-between">
        <Col className="d-flex align-items-center">
          <ViolationClass type="violation" violationClass={violation.class} />
          <ViolationClass
            open={violation.status}
            type="status"
            violationClass={violation.status}
          />
          {violation.apartment !== "Unknown" && (
            <ViolationClass
              type="apartment"
              violationClass={violation.apartment}
            />
          )}
          <small className={styles.violation__date}>
            {moment(violation.inspectionDate, "YYYYMMDD").fromNow()}
          </small>
        </Col>
      </Row>
      <p className={styles.violation__description}>
        {ellipsisText(violation.description, 120, violation.violationid)}
      </p>
    </li>
  );
};

export default Violation;
