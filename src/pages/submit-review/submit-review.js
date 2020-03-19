import React, { useRef, useState } from "react";
import { Formik, FieldArray, Form, Field } from "formik";
import * as Yup from "yup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import Spinner from "react-svg-spinner";
import { gql, useMutation } from "@apollo/client";
import useOnclickOutside from "react-cool-onclickoutside";
import styles from "./submit-review.module.scss";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import RatingInput from "../../components/rating-input/rating-input";
import OptionToggle from "../../components/option-toggle/option-toggle";

const ADD_REVIEW = gql`
  mutation CreateApartment(
    $address: AddressInput!
    $apartment: String
    $location: Coordinates!
    $rent: Int!
    $bedrooms: Int!
    $bathrooms: Int!
    $amenities: [String]!
    $leaseLength: String
    $leaseYearStart: Int
    $leaseYearEnd: Int
    $landlordRating: Int!
    $neighborhoodRating: Int!
    $transportRating: Int!
    $review: String
  ) {
    createApartment(
      address: $address
      apartment: $apartment
      location: $location
      rent: $rent
      bedrooms: $bedrooms
      bathrooms: $bathrooms
      amenities: $amenities
      leaseLength: $leaseLength
      leaseYearStart: $leaseYearStart
      leaseYearEnd: $leaseYearEnd
      landlordRating: $landlordRating
      neighborhoodRating: $neighborhoodRating
      transportRating: $transportRating
      review: $review
    ) {
      apartment
      address {
        street
      }
    }
  }
`;

const amenitiesList = [
  { id: "elevator", name: "Elevator" },
  { id: "laundry", name: "Laundry" },
  { id: "dishwasher", name: "Dishwasher" },
  { id: "doorman", name: "Doorman" },
  { id: "ac", name: "Central AC" },
  { id: "bikeroom", name: "Bike Room" },
  { id: "pets", name: "Pet Friendly" },
  { id: "parking", name: "Parking" },
  { id: "gym", name: "Gym" },
  { id: "roof", name: "Roof Acces" },
  { id: "balcony", name: "Balcony / Fire Escape" },
  { id: "transport", name: "Near transportation" }
];

const ReviewSchema = Yup.object().shape({
  apartment: Yup.string()
    .min(1, "Too Short!")
    .max(10, "Too Long!"),
  rent: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  bedrooms: Yup.string()
    .min(1)
    .required("Required"),
  bathrooms: Yup.string()
    .min(1)
    .required("Required"),
  leaseLength: Yup.string().min(1),
  leaseYearStart: Yup.string().min(4),
  leaseYearEnd: Yup.string().min(4),
  landlordRating: Yup.number()
    .min(1, "Please choose rating!")
    .max(5),
  neighborhoodRating: Yup.number()
    .min(1, "Please choose rating!")
    .max(5),
  transportRating: Yup.number()
    .min(1, "Please choose rating!")
    .max(5)
});

const SubmitReview = () => {
  const [addReview, { loading, data: mutationData }] = useMutation(
    //Also can take error
    ADD_REVIEW
  );

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete();

  const ref = useRef();
  useOnclickOutside(ref, () => {
    clearSuggestions();
  });

  const [hasSelectedAddress, setHasSelectedAddress] = useState("NO_ACTION");

  const address = useRef({});

  const handleInput = e => {
    setValue(e.target.value);
    setHasSelectedAddress("ACTION_TAKEN");
  };

  const getComponent = (prev, component) => {
    if (component.types.includes("street_number")) {
      return { street: component.long_name };
    }
    if (component.types.includes("route")) {
      return { street: `${prev.street} ${component.long_name}` };
    }
    if (component.types.includes("sublocality")) {
      return { city: component.long_name };
    }

    if (component.types.includes("administrative_area_level_1")) {
      return { state: component.long_name };
    }

    if (component.types.includes("postal_code")) {
      return { zipcode: component.long_name };
    }
  };

  const formatAddress = (components, description) => {
    console.log(components);
    return components.reduce((prev, curr) => {
      return { ...prev, ...getComponent(prev, curr) };
    }, {});
  };

  const verifyAddress = () => {
    if (!address.current?.coordinates) {
      setHasSelectedAddress("ACTION_TAKEN");
    }
  };

  const handleSelect = ({ description }) => async () => {
    setValue(description, false);
    clearSuggestions();

    setHasSelectedAddress("HAS_ADDRESS");

    const results = await getGeocode({ address: description });
    const { lat, lng } = await getLatLng(results[0]);
    address.current.coordinates = { lat, lng };
    address.current = {
      ...address.current,
      ...formatAddress(results[0].address_components)
    };
    console.log(results, address);
  };

  const renderSuggestions = () =>
    data.map(suggestion => (
      <li
        className={styles.dropdown_item}
        key={suggestion.id}
        onClick={handleSelect(suggestion)}
      >
        {suggestion.description}
      </li>
    ));

  if (loading) {
    return (
      <div className="h-100 w-100 d-flex align-items-center">
        <Spinner />
      </div>
    );
  }

  if (mutationData) {
    return (
      <Container className="mt-5 pb-5">
        <Row>
          <Col xs={12}>
            <h1 className="text-center">Thanks for submitting your review!</h1>
            <h6 className="text-center">
              Go <Link to="/">home</Link> or <Link to="/explore">explore</Link>{" "}
              more apartments.
            </h6>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!loading && !mutationData) {
    return (
      <Container className="mt-5 pb-5">
        <Row>
          <Col xs={12}>
            <h1 className="text-center">Submit new apartment review</h1>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={8}>
            {}
            <Formik
              initialValues={{
                reviewAddress: "",
                apartment: "",
                rent: "",
                bedrooms: "",
                bathrooms: "",
                amenities: [],
                leaseLength: "",
                leaseYearStart: "",
                leaseYearEnd: "",
                landlordRating: 0,
                neighborhoodRating: 0,
                transportRating: 0,
                review: ""
              }}
              validationSchema={ReviewSchema}
              onSubmit={async values => {
                if (address.current?.coordinates) {
                  addReview({
                    variables: {
                      address: {
                        street: address.current.street,
                        city: address.current.city,
                        state: address.current.state,
                        zipcode: address.current.zipcode
                      },
                      ...values,
                      location: [
                        //GeoJSON requires order to be lng,lat
                        address.current.coordinates.lng,
                        address.current.coordinates.lat
                      ],
                      leaseYearStart: parseInt(values.leaseYearStart),
                      leaseYearEnd: parseInt(values.leaseYearEnd),
                      bedrooms: parseInt(values.bedrooms),
                      bathrooms: parseInt(values.bathrooms)
                    }
                  });
                }
              }}
            >
              {({ errors, touched, values }) => (
                <Form autoComplete="off">
                  <Row>
                    <Col xs={12} md={6} className="mt-5">
                      <label className="w-100">
                        Address*
                        <div ref={ref} className={styles.dropdown_container}>
                          <input
                            value={value}
                            onChange={handleInput}
                            className={styles.input}
                            name="reviewAddress"
                          />
                          {status === "OK" && (
                            <ul className={styles.dropdown}>
                              {renderSuggestions()}
                            </ul>
                          )}
                        </div>
                        {hasSelectedAddress === "ACTION_TAKEN" &&
                          !address?.current?.coordinates && (
                            <small className={styles.error}>
                              Please choose an address from the dropdown
                            </small>
                          )}
                      </label>
                    </Col>
                    <Col xs={12} md={6} className="mt-5">
                      <label>
                        Apartment #
                        <Field name="apartment" className={styles.input} />
                        {errors.apartment && touched.apartment ? (
                          <small className={styles.error}>
                            {errors.apartment}
                          </small>
                        ) : null}
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6} className="mt-5">
                      <label>
                        Rent*
                        <Field
                          type="number"
                          name="rent"
                          className={styles.input}
                        />
                        {errors.rent && touched.rent ? (
                          <small className={styles.error}>{errors.rent}</small>
                        ) : null}
                      </label>
                    </Col>
                    <Col xs={12} md={6} className="mt-5">
                      <label>
                        Bedrooms*
                        <Field name="bedrooms" className={styles.input} />
                        {errors.bedrooms && touched.bedrooms ? (
                          <small className={styles.error}>
                            {errors.bedrooms}
                          </small>
                        ) : null}
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6} className="mt-5">
                      <label>
                        Bathrooms*
                        <Field name="bathrooms" className={styles.input} />
                        {errors.bathrooms && touched.bathrooms ? (
                          <small className={styles.error}>
                            {errors.bathrooms}
                          </small>
                        ) : null}
                      </label>
                    </Col>
                    <Col xs={12} md={6} className="mt-5">
                      <label>
                        Lease Length
                        <Field name="leaseLength" className={styles.input} />
                        {errors.leaseLength && touched.leaseLength ? (
                          <small className={styles.error}>
                            {errors.leaseLength}
                          </small>
                        ) : null}
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6} className="mt-5">
                      <label>
                        Year of lease start
                        <Field name="leaseYearStart" className={styles.input} />
                        {errors.leaseYearStart && touched.leaseYearStart ? (
                          <small className={styles.error}>
                            {errors.leaseYearStart}
                          </small>
                        ) : null}
                      </label>
                    </Col>
                    <Col xs={12} md={6} className="mt-5">
                      <label>
                        Year of lease end
                        <Field name="leaseYearEnd" className={styles.input} />
                        {errors.leaseYearEnd && touched.leaseYearEnd ? (
                          <small className={styles.error}>
                            {errors.leaseYearEnd}
                          </small>
                        ) : null}
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} className="mt-5">
                      <FieldArray
                        name="amenities"
                        render={arrayHelpers => (
                          <div className={styles.grid}>
                            {amenitiesList.map(amenity => (
                              <div key={amenity.id}>
                                <label>
                                  <input
                                    name="amenities"
                                    type="checkbox"
                                    value={amenity.id}
                                    checked={values.amenities.includes(
                                      amenity.id
                                    )}
                                    onChange={e => {
                                      if (e.target.checked)
                                        arrayHelpers.push(amenity.id);
                                      else {
                                        const idx = values.amenities.indexOf(
                                          amenity.id
                                        );
                                        arrayHelpers.remove(idx);
                                      }
                                    }}
                                  />{" "}
                                  {amenity.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col xs={12} sm={4}>
                      <Field
                        name="landlordRating"
                        label="Landlord"
                        styles={styles}
                        component={RatingInput}
                      />
                    </Col>
                    <Col xs={12} sm={4}>
                      <Field
                        name="neighborhoodRating"
                        label="Neighborhood"
                        styles={styles}
                        component={RatingInput}
                      />
                    </Col>
                    <Col xs={12} sm={4}>
                      <Field
                        name="transportRating"
                        label="Transportation"
                        styles={styles}
                        component={RatingInput}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col xs={12}>
                      <label>Would you recommend this apartment?</label>
                      <OptionToggle
                        options={[
                          {
                            name: "Yes",
                            selected: true
                          },
                          {
                            name: "No"
                          }
                        ]}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col xs={12}>
                      <label>Review</label>
                      <Field
                        className={styles.input_textarea}
                        name="review"
                        component="textarea"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col>
                      <Button
                        type="submit"
                        onClick={verifyAddress}
                        disabled={loading}
                      >
                        Submit Review
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default SubmitReview;
