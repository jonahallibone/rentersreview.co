!function(t,n){for(var e in n)t[e]=n[e]}(exports,function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=4)}([,,,function(t,n){t.exports=require("apollo-server")},function(t,n,e){"use strict";e.r(n);var r=e(3);const i=r.gql`
  scalar Coordinates
  scalar Date

  type Query {
    apartments: [Apartment!]!
    getApartment(id: ID!): Apartment!
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
    city: String!
    state: String!
    zipcode: String!
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    zipcode: String!
  }

  type Apartment {
    id: ID!
    address: Address!
    location: Coordinates!
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
    createApartment(
      address: AddressInput!
      location: Coordinates!
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
`;n.default=i}]));