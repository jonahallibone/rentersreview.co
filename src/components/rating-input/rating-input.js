import React from "react";
import { MdStar } from "react-icons/md";
import Rating from "react-rating";

const RatingInput = ({
  styles,
  label,
  field: { value, name },
  form: { touched, errors, setFieldValue }
}) => {
  const handleChange = val => setFieldValue(name, val);

  return (
    <label>
      <div>{label}</div>
      <Rating
        initialRating={value}
        value={value}
        onChange={handleChange}
        emptySymbol={<MdStar size="1.25rem" color="#ced6e0" />}
        fullSymbol={<MdStar size="1.25rem" color="#ffa502" />}
      />
      {errors[name] && touched[name] ? (
        <div>
          <small className={styles.error}>{errors[name]}</small>
        </div>
      ) : null}
    </label>
  );
};

export default RatingInput;
