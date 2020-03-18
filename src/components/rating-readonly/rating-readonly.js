import React from "react";
import Rating from "react-rating";
import { MdStar } from "react-icons/md";

const RatingReadonly = ({value, size="20"}) => (
  <Rating
    initialRating={value}
    emptySymbol={<MdStar size={`${size}px`} color="#ced6e0" />}
    fullSymbol={<MdStar size={`${size}px`} color="#ffa502" />}
    readonly
  />
);

export default RatingReadonly;
