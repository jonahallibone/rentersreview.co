import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const buildingSchema = mongoose.Schema({
  buildingId: String,
  street: String,
  borough: String,
  streetNumber: String,
  zipcode: String,
  complaints: [String],
  averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
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
});

const Building = mongoose.model(
  "Building",
  buildingSchema,
  "buildings" // Collection name
);

const aggregateBuildingRatingAndTotal = async id => {
  console.log(id);
  try {
    const res = await Building.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "building",
          as: "reviews"
        }
      },
      { $unwind: "$reviews" },
      {
        $project: {
          ratingPerDoc: {
            $avg: [
              "$reviews.landlordRating",
              "$reviews.neighborhoodRating",
              "$reviews.transportRating",
              "$reviews.noiseRating",
              "$reviews.maintenanceRating",
              "$reviews.safetyRating"
            ]
          }
        }
      },
      {
        $group: {
          _id: "$reviews._id",
          rating: {
            $avg: "$ratingPerDoc"
          },
          total: { $sum: 1 }
        }
      }
    ]);

    return res;
  } catch (error) {
    throw new Error(console.error());
  }
};

export { Building, aggregateBuildingRatingAndTotal };
