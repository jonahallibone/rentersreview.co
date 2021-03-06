import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet";
import styles from "./home.module.scss";
import HomepageSearch from "../../components/homepage-search/homepage-search";
import RecentReviews from "../../components/recent-reviews/recent-reviews";

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Renters Review | Apartment Building Reviews
        </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className={styles.homepage__hero}>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <h1 className="text-center font-weight-bold">
                Review your apartment and read about your next.
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <HomepageSearch />
            </Col>
          </Row>
        </Container>
      </div>
      <div className={styles.homepage__recent}>
        <RecentReviews />
      </div>
    </div>
  );
};

export default Home;
