import React from "react";
import { useQuery, gql } from "@apollo/client";
import moment from "moment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ArrowRight } from "react-feather";
import styles from "./building-violations.module.scss";
import ViolationsLoader from "./violations-loader";
import ViolationClass from "../violation-class/violation-class";

const GET_PREVIEW_VIOLATIONS = gql`
  query getBuildingViolations($buildingId: ID!) {
    getBuildingViolations(buildingId: $buildingId) {
      violationid
      apartment
      class
      inspectionDate
      description
      status
    }
  }
`;

const GET_ALL_VIOLATIONS = gql`
query getAllBuildingViolations($buildingId: ID!) {
  getAllBuildingViolations(buildingId: $buildingId) {
    violationid
    apartment
    class
    inspectionDate
    description
    status
  }
}
`;

const BuildingViolations = ({ buildingId, preview = true }) => {
  const { loading, error, data } = useQuery(preview ? GET_PREVIEW_VIOLATIONS : GET_ALL_VIOLATIONS, {
    variables: { buildingId }
  });

  if (error) {
    return (
      <h6>
        Im sorry, we are having a problem right now. Please reload the page to
        try again.
      </h6>
    );
  }

  const ellipsisText = (description, maxLength) => {
    const { length } = description;
    if (length > maxLength) {
      const substr = description.substr(0, maxLength - 3);
      return `${substr}...`;
    }

    return description;
  };

  const Violation = ({ violation }) => (
    <li className={styles.violation__item}>
      <Row className="justify-content-between">
        <Col className="d-flex align-items-center">
          <ViolationClass type="violation" violationClass={violation.class} />
          <ViolationClass open={violation.status} type="status" violationClass={violation.status} />
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
        {ellipsisText(violation.description, 120)}
      </p>
    </li>
  );

  const ViolationList = () => {
    if (loading || !buildingId) {
      return (
        <ul className={styles.violations}>
          <ViolationsLoader styles={styles} />
        </ul>
      );
    }

    const { getBuildingViolations } = data;

    return (
      <ul className={styles.violations}>
        {getBuildingViolations.map(violation => (
          <Violation key={violation.violationid} violation={violation} />
        ))}
        {getBuildingViolations.length && (
          <li className={styles.more_violations}>
            See more violations{" "}
            <ArrowRight className="ml-2" strokeWidth={3} size={16} />
          </li>
        )}
      </ul>
    );
  };

  return (
    <div className>
      <h6>NYC Housing Department Violations</h6>
      <ViolationList />
    </div>
  );
};

export default BuildingViolations;
