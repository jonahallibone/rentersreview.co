import { Apartment } from "./models/Apartment";

export const resolvers = {
  Query: {
    apartments: () => Apartment.find(),
    getApartment: (parent, args, context, info) => Apartment.findById(args.id)
  },
  Mutation: {
    createApartment: async (
      _,
      {
        address,
        location,
        apartment,
        rent,
        bedrooms,
        bathrooms,
        amenities,
        leaseLength,
        leaseYearStart,
        leaseYearEnd,
        landlordRating,
        neighborhoodRating,
        transportRating,
        review,
      }
    ) => {
      const newApartment = new Apartment({
        address: {...address},
        location: {
          type: "Point",
          coordinates: location
        },
        apartment,
        rent,
        bedrooms,
        bathrooms,
        amenities,
        leaseLength,
        leaseYearStart,
        leaseYearEnd,
        landlordRating,
        neighborhoodRating,
        transportRating,
        review
      });

      await newApartment.save();
      return newApartment;
    }
  }
};
