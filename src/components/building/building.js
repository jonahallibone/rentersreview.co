import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  useParams,
  Link,
  Route,
  useRouteMatch,
  NavLink
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ArrowLeft, Plus, Heart, Share } from "react-feather";
import RatingReadonly from "../rating-readonly/rating-readonly";
import styles from "./building.module.scss";
import ClaimApartment from "../claim-apartment/claim-apartment";
import ReviewMap from "../review-map/review-map";
import Button from "../button/button";
import BuildingViolations from "../building-violations/building-violations";
import ComplaintsChart from "../complaints-chart/complaints-chart";
import ReviewSingle from "../review-single/review-single";
import BuildingReviews from "../building-reviews/building-reviews";

const GET_BUILDING = gql`
  query GetBuilding($id: ID!) {
    getBuilding(id: $id) {
      street
      streetNumber
      zipcode
      borough
      location
      buildingId
    }
  }
`;

const Building = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BUILDING, {
    variables: { id }
  });

  const match = useRouteMatch({
    path: "/building/:id",
    strict: true,
    sensitive: true
  });

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  const { getBuilding: building } = data;

  return (
    <Container>
      <Row>
        <Col>
          <div className="pt-2 pb-2">
            <Link className={styles.back_nav} to="/">
              <ArrowLeft size={14} strokeWidth={3} className="mr-2" />
              Back to Home
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <ReviewMap location={building.location} />
        </Col>
      </Row>
      <Row className="pt-5">
        <Col xs={12} sm={12} md={8}>
          <Row>
            <Col>
              <h1 className={styles.display_1}>
                {building.streetNumber} {building.street}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6 className={styles.display_2}>
                {building.borough}, NY {building.zipcode}
              </h6>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={12}>
              <div className="d-flex align-items-center">
                <RatingReadonly value={0} size="25" />
                <small className="mb-0 ml-2">0 Reviews</small>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button type="link" to="/submit-review">
                <Plus size={18} strokeWidth={3} className="mr-2" />
                Review this building
              </Button>
              <Button className="ml-2" type="link" to="/submit-review">
                <Share size={18} strokeWidth={3} className="mr-2" />
                Share
              </Button>
              <Button className="ml-2" type="link" to="/submit-review">
                <Heart size={18} strokeWidth={3} className="mr-2" />
                Save
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={styles.building__tabs}>
                <NavLink
                  exact
                  className={styles.building__tab}
                  activeClassName={styles.building__tab__selected}
                  to={`${match.url}/`}
                >
                  Overview
                </NavLink>
                <NavLink
                  className={styles.building__tab}
                  activeClassName={styles.building__tab__selected}
                  to={`${match.url}/reviews`}
                >
                  Reviews
                </NavLink>
                <NavLink
                  className={styles.building__tab}
                  activeClassName={styles.building__tab__selected}
                  to={`${match.url}/violations`}
                >
                  Violations
                </NavLink>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Route exact path={`${match.path}`}>
                <ComplaintsChart building={building} />
                <BuildingViolations preview buildingId={building.buildingId} />
              </Route>
              <Route path={`${match.path}/reviews`}>
                <BuildingReviews buildingId={building.buildingId} />
              </Route>
              <Route path={`${match.path}/violations`}>
                <BuildingViolations buildingId={building.buildingId} />
              </Route>
              <Route path={`${match.path}/reviews/:id`}>
                <ReviewSingle />
              </Route>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={4}>
          <ClaimApartment />
        </Col>
      </Row>
    </Container>
  );
};

export default Building;
