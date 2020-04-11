import axios from "axios";
import qs from "qs";
import { UserInputError } from "apollo-server";
import Geocodio from "geocodio-library-node";
import Review from "./models/Review";
import { Building } from "./models/Building";

const geocoder = new Geocodio("906e226650616fafe25e522fe92a692101a2021");

const resolvers = {
  Query: {
    reviews: async () => {
      const res = await Review.find()
        .limit(10)
        .populate("building");
      console.log(res);
      return res;
    },
    getApartment: async (parent, args, { id }) => {
      const user_id = await id;
      if (user_id) {
        return Review.findById(args.id);
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
    getBuildingComplaints: async (parent, args, { id }) => {
      const building = await Building.findOne({ buildingId: args.buildingId });

      if (!building || !building.complaints.length) {
        return [];
      }

      const nycComplaintsUrl = axios.create({
        baseURL: "https://data.cityofnewyork.us/resource/a2nx-4u46.json",
        timeout: 10000,
        headers: { "X-App-Token": "QAbvk83yxp1J8aM76x7YlaJtt" }
      });

      const fields = [
        "complaintid",
        "problemid",
        "unittype",
        "spacetype",
        "type",
        "majorcategory",
        "minorcategory",
        "code",
        "status",
        "statusdate",
        "statusdescription"
      ];

      const query = qs.stringify(
        {
          $where: `complaintid in(${building.complaints.join(",")})`,
          $select: fields.join(","),
          $order: "statusdate DESC",
          $limit: args.limit
        },
        { encodeValuesOnly: true }
      );

      try {
        const complaints = await nycComplaintsUrl.get(`?${query}`);
        const { data } = complaints;

        if (!data.length) {
          return [];
        }

        return data.map(complaint => {
          const {
            complaintid,
            problemid,
            unittype,
            spacetype,
            type,
            majorcategory,
            minorcategory,
            code,
            status,
            statusdate,
            statusdescription
          } = complaint;

          return {
            complaintId: complaintid,
            problemId: problemid,
            unitType: unittype,
            spaceType: spacetype,
            urgency: type,
            majorCategory: majorcategory,
            minorCategory: minorcategory,
            code,
            status,
            statusDate: statusdate,
            statusDescription: statusdescription
          };
        });
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
    createReview: async (
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
      const req = {
        streetNumber: address.streetNumber,
        street: address.street.toUpperCase(),
        borough: address.city.toUpperCase()
      };

      try {
        const building = await Building.findOne(req);

        const getBuildingId = async doc => {
          if (!doc) {
            const nycHpdBuildingsUrl = axios.create({
              baseURL: "https://data.cityofnewyork.us/resource/kj4p-ruqc.json",
              timeout: 10000,
              headers: { "X-App-Token": "QAbvk83yxp1J8aM76x7YlaJtt" }
            });

            const fields = ["buildingid"];

            const query = qs.stringify(
              {
                $where: `streetname='${address.street.toUpperCase()}' AND housenumber='${
                  address.streetNumber
                }' AND zip='${address.zipcode}'`,
                $select: fields.join(",")
              },
              { encodeValuesOnly: true }
            );

            try {
              const hpdBuilding = await nycHpdBuildingsUrl.get(`?${query}`);
              const { data } = hpdBuilding;

              const coords = await geocoder.geocode(
                `${address.streetNumber} ${address.street}, ${address.city} NY, ${address.zipcode}`
              );

              console.log(coords);

              if (!coords.results.length) {
                throw new UserInputError("Address invalid");
              }

              const newBuilding = new Building({
                buildingId: data[0].buildingid,
                street: address.street.toUpperCase(),
                borough: address.city.toUpperCase(),
                streetNumber: address.streetNumber,
                zipcode: address.zipcode,
                complaints: [],
                location: {
                  type: "Point",
                  coordinates: [
                    coords.results[0].location.lng,
                    coords.results[0].location.lat
                  ]
                }
              });

              await newBuilding.save();
              return newBuilding._id;
            } catch (err) {
              console.log(err);
              throw new UserInputError(err);
            }
          }

          return doc._id;
        };

        const buildingId = await getBuildingId(building);

        const newReview = new Review({
          location: {
            type: "Point",
            coordinates: location
          },
          building: buildingId,
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

        await newReview.save();
        return newReview;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

export { resolvers };
