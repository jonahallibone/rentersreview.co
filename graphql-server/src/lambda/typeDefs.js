import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    apartments: [Apartment!]!
  }

  type Address {
    street: String!
    city: String!
    state: String!
    zipcode: String!
    coordindates: [Float]
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    zipcode: String!
    coordindates: [Float]
  }

  type Apartment {
    id: ID!
    address: Address!
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
  }

  type Mutation {
    createApartment(
      address: AddressInput!
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
    ): Apartment!
  }
`;
