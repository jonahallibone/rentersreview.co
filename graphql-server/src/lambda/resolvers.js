import { Apartment } from "./models/Apartment";
import { Building } from "./models/Building";

const resolvers = {
  Query: {
    apartments: () => Apartment.find(),
    getApartment: async (parent, args, { id }, info) => {
      const uuid = await id;
      if (uuid) {
        return Apartment.findById(args.id);
      }
    },
    SearchBuildings: async (parent, args, { id }, info) => {
      const uuid = await id;
      const results = await Building.aggregate([
        {
          $searchBeta: {
            text: {
              query: args.query,
              path: ["streetNumber", "street", "zipcode"]
            }
          }
        },
        {
          $facet: {
            paginatedResults: [{ $skip: 0 }, { $limit: 5 }],
            totalCount: [
                {
                  $count: 'count'
                }
              ]
          }
        }
      ]);

      return {
        buildings: results[0].paginatedResults,
        total: results[0].totalCount[0].count
      };
    }    
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
        review
      }
    ) => {
      const newApartment = new Apartment({
        address: { ...address },
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

export { resolvers };
