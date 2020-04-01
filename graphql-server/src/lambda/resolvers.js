import axios from "axios";
import qs from "qs";
import { Apartment } from "./models/Apartment";
import { Building } from "./models/Building";

const resolvers = {
  Query: {
    apartments: () => Apartment.find(),
    getApartment: async (parent, args, { id }) => {
      const user_id = await id;
      if (user_id) {
        return Apartment.findById(args.id);
      }
    },
    getBuilding: async (parent, args, { id }) => {
      try {
        const building = await Building.findById(args.id);
        return building;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
    getBuildingViolations: async (parent, args, { id }) => {
      const nycViolationsUrl = axios.create({
        baseURL: "https://data.cityofnewyork.us/resource/wvxf-dwi5.json",
        timeout: 1000,
        headers: { "X-App-Token": "QAbvk83yxp1J8aM76x7YlaJtt" }
      });

      const query = qs.stringify(
        {
          $where: `buildingid=${args.buildingId}`,
          $select:
            "class,apartment,inspectiondate,novdescription,violationid,violationstatus",
          $order: "inspectiondate DESC",
          $limit: args.limit
        },
        { encodeValuesOnly: true }
      );

      try {
        const violations = await nycViolationsUrl.get(`?${query}`);
        const { data } = violations;

        return data.map(violation => ({
          status: violation.violationstatus ?? "",
          violationid: violation.violationid,
          apartment: violation.apartment ?? "Unknown",
          class: violation.class ?? "Unknown",
          inspectionDate: violation.inspectiondate ?? "Unknown",
          description: violation.novdescription ?? "Unknown"
        }));
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
    SearchBuildings: async (parent, args, { id }) => {
      const user_id = await id;
      const results = await Building.aggregate([
        {
          $searchBeta: {
            compound: {
              must: {
                text: {
                  query: args.query.split(" "),
                  path: ["streetNumber"]
                }
              },
              should: {
                phrase: {
                  query: args.query.split(" "),
                  path: ["street"],
                  slop: 0
                }
              }
            }
          }
        },
        {
          $facet: {
            paginatedResults: [{ $skip: 0 }, { $limit: 5 }],
            totalCount: [
              {
                $count: "count"
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
