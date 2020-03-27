!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=12)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("apollo-server")},function(e,t,r){"use strict";r.r(t);var n=r(1);const i=n.gql`

  scalar Coordinates

  type Query {
    apartments: [Apartment!]!
    getApartment(id: ID!): Apartment!
    getBuilding(id: ID!): Building
    SearchBuildings(query: String!): BuildingSearch!
  }

  type Building {
    _id: ID!
    buildingId: String!
    street: String!
    borough: String!
    streetNumber: String!,
    zipcode: String!,
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
`;t.default=i},function(e,t,r){"use strict";r.r(t);var n=r(0),i=r.n(n);const o=i.a.model("Apartment",{address:{street:String,city:String,state:String,zipcode:String},location:{type:{type:String,enum:["Point"],required:!0},coordinates:{type:[Number],required:!0}},apartment:String,rent:Number,bedrooms:Number,bathrooms:Number,amenities:[String],leaseLength:String,leaseYearStart:Number,leaseYearEnd:Number,landlordRating:Number,neighborhoodRating:Number,transportRating:Number,review:String}),a=i.a.model("Building",{buildingId:String,street:String,borough:String,streetNumber:String,zipcode:String,location:{type:{type:String,enum:["Point"],required:!0},coordinates:{type:[Number],required:!0}}},"buildings");function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"resolvers",(function(){return l}));const l={Query:{apartments:()=>o.find(),getApartment:async(e,t,{id:r},n)=>{if(await r)return o.findById(t.id)},SearchBuildings:async(e,t,{id:r},n)=>{await r;const i=await a.aggregate([{$searchBeta:{text:{query:t.query,path:["streetNumber","street","zipcode"]}}},{$facet:{paginatedResults:[{$skip:0},{$limit:5}],totalCount:[{$count:"count"}]}}]);return{buildings:i[0].paginatedResults,total:i[0].totalCount[0].count}}},Mutation:{createApartment:async(e,{address:t,location:r,apartment:n,rent:i,bedrooms:a,bathrooms:s,amenities:c,leaseLength:l,leaseYearStart:d,leaseYearEnd:g,landlordRating:p,neighborhoodRating:b,transportRating:f,review:y})=>{const m=new o({address:u({},t),location:{type:"Point",coordinates:r},apartment:n,rent:i,bedrooms:a,bathrooms:s,amenities:c,leaseLength:l,leaseYearStart:d,leaseYearEnd:g,landlordRating:p,neighborhoodRating:b,transportRating:f,review:y});return await m.save(),m}}}},function(e,t){e.exports=require("apollo-server-lambda")},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("@sentry/node")},function(e,t){e.exports=require("graphql-tools")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("jwks-rsa")},function(e,t){e.exports=require("graphql")},function(e,t){e.exports=require("encoding")},function(e,t,r){"use strict";r.r(t);var n=r(4),i=r(0),o=r.n(i),a=r(5),s=r(6),u=(r(11),r(7)),c=r(8),l=r.n(c),d=r(9),g=r.n(d),p=r(3),b=r(2);const f=new(r(10).GraphQLScalarType)({name:"Coordinates",description:"A set of coordinates. x, y",parseValue:e=>e,serialize:e=>e,parseLiteral:e=>e.value});function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"handler",(function(){return v}));const S=g()({jwksUri:"https://dev-yxi32afc.auth0.com/.well-known/jwks.json"}),h=(e,t)=>{S.getSigningKey(e.kid,(e,r)=>{const n=r.publicKey||r.rsaPublicKey;t(null,n)})},O={audience:process.env.AUTH0_AUDIENCE,issuer:"https://dev-yxi32afc.auth0.com/",algorithms:["RS256"]};Object(a.config)(),s.init({dsn:"https://4de26209a3c44912b676ef8013081e8b@sentry.io/4754945"});(async()=>{await o.a.connect(process.env.DB_HOST,{useNewUrlParser:!0,useUnifiedTopology:!0})})();const v=new n.ApolloServer({schema:Object(u.makeExecutableSchema)({typeDefs:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){m(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},b.default,{geoPointScalar:f}),resolvers:p.resolvers}),context:({event:e})=>{if(e.headers.authorization){const t=e.headers.authorization.replace("Bearer ","");if(t.length){return{id:new Promise((e,r)=>{l.a.verify(t,h,O,(t,n)=>t?r(t):e(n["https://rentersreview.co/uuid"]))})}}}}}).createHandler({cors:{origin:"*",credentials:!0}})}]));