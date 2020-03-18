import React from "react";
import styles from "./recent-reviews.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "react-rating";
import { useQuery, gql } from "@apollo/client";
import ApartmentCard, {
  ApartmentCardHeader,
  ApartmentCardFooter,
  ApartmentCardContent
} from "../apartment-card/apartment-card";
import RatingReadonly from "../rating-readonly/rating-readonly";

const RecentReviews = () => {
  const GET_RECENT_APARTMENTS = gql`
  {
    apartments {
      id
      address {
        street
      }
      landlordRating
      neighborhoodRating
      transportRating
    }
  }
`;

  const { loading, error, data } = useQuery(GET_RECENT_APARTMENTS);

  const showRecent = data => {
    const { apartments } = data;

    return apartments.map(apartment => {
      const { landlordRating, neighborhoodRating, transportRating } = apartment;
      const overall = (landlordRating + neighborhoodRating + transportRating) / 3;
      return (
        <ApartmentCard id={apartment.id} key={apartment.id}>
          <ApartmentCardHeader></ApartmentCardHeader>
          <ApartmentCardContent>
            <h6 className="mb-2">{apartment.address.street}</h6>
            <div>
              <small>Landlord Rating</small>
            </div>
            <div>
              <RatingReadonly value={landlordRating} />
            </div>
            <div>
              <small>Neighborhood Rating</small>
            </div>
            <div>
              <RatingReadonly value={neighborhoodRating} />
            </div>
            <div>
              <small>Transportation Rating</small>
            </div>
            <div>
              <RatingReadonly value={transportRating} />
            </div>
          </ApartmentCardContent>
          <ApartmentCardFooter>
            <div>
              <small>Overall — {overall.toFixed(1)}</small>
            </div>
            <div>
              <RatingReadonly value={overall} />
            </div>
          </ApartmentCardFooter>
        </ApartmentCard>
      );
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {JSON.stringify(error)}</p>;

  return (
    <div className={styles.homepage__recent}>
      <Container>
        <Row>
          <Col xs={12}>
            <div className={styles.review_grid}>{showRecent(data)}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RecentReviews;
