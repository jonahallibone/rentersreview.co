!function(t,e){for(var n in e)t[n]=e[n]}(exports,function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=5)}({1:function(t,e){t.exports=require("apollo-server")},5:function(t,e,n){"use strict";n.r(e);var i=n(1);const r=i.gql`
  scalar Coordinates
  scalar Date

  type Query {
    reviews: [Review!]!
    getBuildingReviews(id: ID!): [Review!]!
    getReview(id: ID!): Review!
    getBuilding(id: ID!): Building!
    SearchBuildings(query: String!): BuildingSearch!
    getBuildingViolations(buildingId: ID!, limit: Int): [Violation!]!
    getBuildingComplaints(buildingId: ID!): [Complaint!]!
    getNearbyBuildings(buildingId: ID!): [Building!]!
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
`;e.default=r}}));