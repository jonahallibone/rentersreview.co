import mongoose from "mongoose";

const Building = mongoose.model(
  "Building",
  {
    buildingId: String,
    street: String,
    borough: String,
    streetNumber: String,
    zipcode: String,
    complaints: [String],
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  "buildings" // Collection name
);

export { Building };
