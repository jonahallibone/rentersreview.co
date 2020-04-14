import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Coordinates
  scalar Date

  type Query {
    reviews: [Review!]!
    getBuildingReviews(id: ID!): [Review!]!
    getApartment(id: ID!): Review!
    getBuilding(id: ID!): Building!
    SearchBuildings(query: String!): BuildingSearch!
    getBuildingViolations(buildingId: ID!, limit: Int): [Violation!]!
    getBuildingComplaints(buildingId: ID!): [Complaint!]!
  }

  type Violation {
    violationid: ID!
    apartment: String!
    class: String!
    inspectionDate: Date!
    description: String!
    status: String!
  }

  type Building {
    _id: ID!
    buildingId: ID!
    street: String!
    borough: String!
    streetNumber: String!
    zipcode: String!
    location: Coordinates!
  }

  type BuildingSearch {
    buildings: [Building!]!
    total: String!
  }

  type Address {
    street: String!
    streetNumber: String!
    city: String!
    state: String!
    zipcode: String!
  }

  input AddressInput {
    streetNumber: String!
    street: String!
    city: String!
    state: String!
    zipcode: String!
  }

  type Review {
    id: ID!
    building: Building!
    apartment: String
    rent: String!
    bedrooms: Int!
    bathrooms: Int!
    amenities: [String]!
    leaseLength: String
    leaseYearStart: String
    leaseYearEnd: String
    landlordRating: Int!
    neighborhoodRating: Int!
    transportRating: Int!
    review: String!
    createdAt: Date
  }

  type Complaint {
    complaintId: ID!
    problemId: ID!
    unitType: String!
    spaceType: String!
    urgency: String!
    majorCategory: String!
    minorCategory: String!
    code: String!
    status: String!
    statusDate: Date,
    statusDescription: String!
  }

  type Mutation {
    createReview(
      address: AddressInput!
      location: Coordinates!
      recommended: String!
      apartment: String
      rent: Int!
      bedrooms: Int!
      bathrooms: Int!
      amenities: [String]!
      leaseLength: String
      leaseYearStart: Int
      leaseYearEnd: Int
      landlordRating: Int!
      neighborhoodRating: Int!
      transportRating: Int!
      review: String
    ): Review!
  }
`;

export default typeDefs;
