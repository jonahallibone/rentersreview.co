import React, { useRef, useEffect, useState } from "react";
import styles from "./apartment-review.module.scss";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import mapboxgl from "mapbox-gl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9uYWhhbGxpYm9uZSIsImEiOiJjamxvMnFraG0wMDc3M3FudjQ1N214ZTRwIn0.xI100RpP8Uh4jbxU0i3waA";

const GET_APARTMENT = gql`
  query GetApartment($id: ID!) {
    getApartment(id: $id) {
      address {
        street
        zipcode
      }
      location
      apartment
      rent
      bedrooms
      bathrooms
      amenities
      leaseLength
      leaseYearStart
      leaseYearEnd
      landlordRating
      neighborhoodRating
      transportRating
      review
    }
  }
`;

const ApartmentPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_APARTMENT, {
    variables: { id: id }
  });

  const [aptState, setAptState] = useState({});

  const mapContainer = useRef(null);

  useEffect(() => {
    if (data && !loading) {
      const { getApartment } = data;
      console.log(getApartment.address);
      const coords = getApartment.location.coordinates;

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: coords,
        zoom: 15
      });
      setAptState(getApartment);
    }
  }, [data]);

  if (loading) {
    return "Loading...";
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12}>
          <h2>{aptState.address?.street}</h2>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col xs={8}></Col>
        <Col xs={4}>
          <div className={styles.map} ref={mapContainer} />
        </Col>
      </Row>
    </Container>
  );
};

export default ApartmentPage;
