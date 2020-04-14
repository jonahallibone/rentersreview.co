import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import styles from "./building-reviews.module.scss";

const GET_BUILDING_REVIEWS = gql`
  query GetBuildingReviews($id: ID!) {
    getBuildingReviews(id: $id) {
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

const BuildingReviews = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_BUILDING_REVIEWS, {
    variables: { id }
  });

  if (data) {
    console.log(data);
  }
  return <div></div>;
};

export default BuildingReviews;
