import { Apartment } from "./models/Apartment";

export const resolvers = {
  Query: {
    apartments: () => Apartment.find()
  },
  Mutation: {
    createApartment: async (
      _,
      {
        address,
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
