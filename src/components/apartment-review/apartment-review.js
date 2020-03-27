import React, { useRef, useEffect, useState, useCallback } from "react";
import styles from "./apartment-review.module.scss";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReviewMap from "../review-map/review-map";
import RatingReadonly from "../rating-readonly/rating-readonly";
import {
  FaShower,
  FaBed,
  FaWind,
  FaWeightHanging,
  FaParking,
  FaTshirt
} from "react-icons/fa";
import { MdPets, MdDirectionsBike, MdTrain } from "react-icons/md";
import ClaimApartment from "../claim-apartment/claim-apartment";

const GET_APARTMENT = gql`
  query GetApartment($id: ID!) {
    getApartment(id: $id) {
      address {
        street
        city
        state
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
  const { loading, data } = useQuery(GET_APARTMENT, {
    variables: { id: id }
  });

  const [aptState, setAptState] = useState(null);
  const averageRating = useRef(0);

  useEffect(() => {
    if (data) {
      const { getApartment } = data;
      const {
        landlordRating,
        neighborhoodRating,
        transportRating
      } = getApartment;
      averageRating.current =
        (landlordRating + neighborhoodRating + transportRating) / 3;
      setAptState(getApartment);
    }
  }, [data]);

  const getAmenityIcon = amenity => {
    switch (amenity) {
      case "elevator":
        return "";
      case "pets":
        return <MdPets />;
      case "ac":
        return <FaWind />;
      case "dishwasher":
        return "";
      case "gym":
        return <FaWeightHanging />;
      case "roof":
        return "";
      case "laundry":
        return <FaTshirt />;
      case "parking":
        return <FaParking />;
      case "bikeroom":
        return <MdDirectionsBike />;
      case "transport":
        return <MdTrain />;
      default:
        return amenity;
    }
  };

  const getAmenityName = amenity => {
    switch (amenity) {
      case "elevator":
        return "Elevator";
      case "pets":
        return "Pet Friendly";
      case "ac":
        return "Air conditioning";
      case "dishwasher":
        return "Dishwasher";
      case "gym":
        return "Gym";
      case "roof":
        return "Roof access";
      case "laundry":
        return "Laundry";
      case "parking":
        return "Parking";
      case "bikeroom":
        return "Bike room";
      case "transport":
        return "Public transit";
      default:
        return amenity;
    }
  };

  const getAddress = (street, apt) => {
    if (apt) {
      return `${street}, ${apt}`;
    }

    return street;
  };

  const getRemaingAmenities = useCallback(() => {
    return aptState.amenities.map(amenity => (
      <div key={amenity} className="d-flex align-items-center">
        <span className={styles.icon}>{getAmenityIcon(amenity)}</span>
        {getAmenityName(amenity)}
      </div>
    ));
  }, [aptState]);

  if (aptState) {
    return (
      <div>
        {aptState?.location && <ReviewMap location={aptState.location} />}
        <Container className="mt-5">
          <Row className="mt-5">
            <Col xs={12} md={8}>
              <Row>
                <Col xs={12}>
                  <h1 className={styles.display_1}>
                    {getAddress(aptState.address.street, aptState.apartment)}
                  </h1>
                  <h6 className={styles.display_2}>
                    {aptState.address.city}, {aptState.address.state},{" "}
                    {aptState.address.zipcode}
                  </h6>
                  <div className="d-flex align-items-center">
                    <RatingReadonly value={averageRating.current} size="25" />
                    <h6 className="mb-0 ml-2">
                      {averageRating.current.toFixed(1)}
                    </h6>
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col xs={12}>
                  <h6>Review</h6>
                  <p className={!aptState?.review ? styles.no_content : ""}>
                    {aptState?.review ? aptState?.review : "No review"}
                  </p>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col xs={12} md={4}>
                  <div>
                    <small>Landlord Rating</small>
                  </div>
                  <RatingReadonly value={aptState.landlordRating} />
                </Col>
                <Col xs={12} md={4}>
                  <div>
                    <small>Neighborhood Rating</small>
                  </div>
                  <RatingReadonly value={aptState.neighborhoodRating} />
                </Col>
                <Col xs={12} md={4}>
                  <div>
                    <small>Transport Rating</small>
                  </div>
                  <RatingReadonly value={aptState.transportRating} />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <h6 className="mt-5">Amenities</h6>
                  <div className={styles.amenities_grid}>
                    <div>
                      <div className="d-flex align-items-center">
                        <span className={styles.icon}>
                          <FaShower size="1.25rem" />
                        </span>
                        {aptState.bathrooms}{" "}
                        {aptState.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center">
                        <span className={styles.icon}>
                          <FaBed size="1.25rem" />
                        </span>
                        {aptState.bedrooms}{" "}
                        {aptState.bedrooms > 1 ? "Bedrooms" : "Bedroom"}
                      </div>
                    </div>
                    {getRemaingAmenities()}
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col xs={12}>
                  <h6>Lease Details</h6>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={12} sm>
                  <small>Rent</small>
                  <p>${aptState.rent}/mo</p>
                </Col>
                <Col xs={12} sm>
                  <small>Lease start</small>
                  <p>{aptState.leaseYearStart ?? "Unknown"}</p>
                </Col>
                <Col xs={12} sm>
                  <small>Lease end</small>
                  <p>{aptState.leaseYearEnd ?? "Unknown"}</p>
                </Col>
                <Col xs={12} sm>
                  <small>Total length</small>
                  <p>{aptState.leaseLength} months</p>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={4} className="mt-5 mt-sm-0">
              <ClaimApartment />
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>{loading ? "Loading..." : "Error"}</h2>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ApartmentPage;
