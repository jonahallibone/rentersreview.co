import mongoose, { Schema } from "mongoose";

const Review = mongoose.model(
  "Review",
  mongoose.Schema(
    {
      apartment: String,
      building: {
        type: Schema.Types.ObjectId,
        ref: "Building"
      },
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
      noiseRating: Number,
      maintenanceRating: Number,
      safetyRating: Number,
      recommended: String,
      review: String,
      createdAt: Date
    },
    { timestamps: true }
  )
);

export default Review;
