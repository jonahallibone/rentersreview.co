import React from "react";
import styles from "./navigation.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "../button/button";

const Navigation = () => {
  return (
    <header className={styles.navigation}>
      <Container>
        <Row className="align-items-center">
          <Col xs={6} sm={6}>
            <Link to="/">
              <h6 className={styles.logo}>Renters Review</h6>
            </Link>
          </Col>
          <Col xs={6} sm={6} className="d-flex justify-content-end">
            <Button type="link" to="/submit-review">
              Add a review
            </Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Navigation;
