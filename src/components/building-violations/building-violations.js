import React from "react";
import { useQuery, gql } from "@apollo/client";
import { ArrowRight } from "react-feather";
import { useHistory, useRouteMatch } from "react-router-dom";
import styles from "./building-violations.module.scss";
import ViolationsLoader from "./violations-loader";
import Violation from "../violation/violation";

const GET_VIOLATIONS = gql`
  query getBuildingViolations($buildingId: ID!, $limit: Int) {
    getBuildingViolations(buildingId: $buildingId, limit: $limit) {
      violationid
      apartment
      class
      inspectionDate
      description
      status
    }
  }
`;

const BuildingViolations = ({ buildingId, preview = false }) => {
  const { loading, error, data } = useQuery(GET_VIOLATIONS, {
    variables: { buildingId, limit: preview ? 3 : 10000 }
  });

  const history = useHistory();
  const match = useRouteMatch({
    path: "/building/:id",
    strict: true,
    sensitive: true
  });

  if (error) {
    return (
      <h6>
        Im sorry, we are having a problem right now. Please reload the page to
        try again.
      </h6>
    );
  }

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
        {getBuildingViolations.length && preview && (
          <li
            role="option"
            aria-selected
            onKeyPress={() => {}}
            onClick={() => history.push(`${match.url}/violations`)}
            className={styles.more_violations}
          >
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
