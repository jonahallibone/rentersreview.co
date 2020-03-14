import React from "react";
import Rating from "react-rating";
import { MdStar } from "react-icons/md";

const RatingReadonly = ({value}) => (
  <Rating
    initialRating={value}
    emptySymbol={<MdStar size="1.25rem" color="#ced6e0" />}
    fullSymbol={<MdStar size="1.25rem" color="#ffa502" />}
    readonly
  />
);

export default RatingReadonly;
