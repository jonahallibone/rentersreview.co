import mongoose from "mongoose";

const Apartment = mongoose.model("Apartment", {
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
    coordinates: [Number]
  },
  apartment: String,
  rent: Number,
  bedrooms: Number,
  bathrooms: Number,
  amenities: [String],
  leaseLength: String,
  leaseYearStart: Number,
  leaseYearEnd: Number,
  landlordRating: Number,
  neighborhoodRating: Number,
  transportRating: Number,
  review: String
});

export {
  Apartment
}
