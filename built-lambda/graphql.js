!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=15)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("qs")},function(e,t){e.exports=require("apollo-server")},function(e,t,r){"use strict";r.r(t);var n=r(3);const i=n.gql`
  scalar Coordinates
  scalar Date

  type Query {
    apartments: [Apartment!]!
    getApartment(id: ID!): Apartment!
    getBuilding(id: ID!): Building!
    SearchBuildings(query: String!): BuildingSearch!
    getBuildingViolations(buildingId: ID!): [Violation!]!
  }

  type Violation {
    violationid: ID!
    apartment: String!
    class: String!
    inspectionDate: Date!
    description:  String!
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
`;t.default=i},function(e,t,r){"use strict";r.r(t);var n=r(1),i=r.n(n),o=r(2),a=r.n(o),s=r(0),u=r.n(s);const c=u.a.model("Apartment",{address:{street:String,city:String,state:String,zipcode:String},location:{type:{type:String,enum:["Point"],required:!0},coordinates:{type:[Number],required:!0}},apartment:String,rent:Number,bedrooms:Number,bathrooms:Number,amenities:[String],leaseLength:String,leaseYearStart:Number,leaseYearEnd:Number,landlordRating:Number,neighborhoodRating:Number,transportRating:Number,review:String}),l=u.a.model("Building",{buildingId:String,street:String,borough:String,streetNumber:String,zipcode:String,location:{type:{type:String,enum:["Point"],required:!0},coordinates:{type:[Number],required:!0}}},"buildings");function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){g(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function g(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"resolvers",(function(){return b}));const b={Query:{apartments:()=>c.find(),getApartment:async(e,t,{id:r})=>{if(await r)return c.findById(t.id)},getBuilding:async(e,t,{id:r})=>{try{return await l.findById(t.id)}catch(e){throw console.error(e),new Error(e)}},getBuildingViolations:async(e,t,{id:r})=>{const n=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/wvxf-dwi5.json",timeout:1e3,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),o=a.a.stringify({$where:`buildingid=${t.buildingId}`,$select:"class,apartment,inspectiondate,novdescription,violationid,violationstatus",$order:"inspectiondate DESC",$limit:3},{encodeValuesOnly:!0});try{const e=await n.get(`?${o}`),{data:t}=e;return t.map(e=>{var t,r,n,i,o;return{status:null!==(t=e.violationstatus)&&void 0!==t?t:"",violationid:e.violationid,apartment:null!==(r=e.apartment)&&void 0!==r?r:"Unknown",class:null!==(n=e.class)&&void 0!==n?n:"Unknown",inspectionDate:null!==(i=e.inspectiondate)&&void 0!==i?i:"Unknown",description:null!==(o=e.novdescription)&&void 0!==o?o:"Unknown"}})}catch(e){throw console.error(e),new Error(e)}},SearchBuildings:async(e,t,{id:r})=>{await r;const n=await l.aggregate([{$searchBeta:{compound:{must:{text:{query:t.query.split(" "),path:["streetNumber"]}},should:{phrase:{query:t.query.split(" "),path:["street"],slop:0}}}}},{$facet:{paginatedResults:[{$skip:0},{$limit:5}],totalCount:[{$count:"count"}]}}]);return{buildings:n[0].paginatedResults,total:n[0].totalCount[0].count}}},Mutation:{createApartment:async(e,{address:t,location:r,apartment:n,rent:i,bedrooms:o,bathrooms:a,amenities:s,leaseLength:u,leaseYearStart:l,leaseYearEnd:d,landlordRating:g,neighborhoodRating:b,transportRating:f,review:y})=>{const m=new c({address:p({},t),location:{type:"Point",coordinates:r},apartment:n,rent:i,bedrooms:o,bathrooms:a,amenities:s,leaseLength:u,leaseYearStart:l,leaseYearEnd:d,landlordRating:g,neighborhoodRating:b,transportRating:f,review:y});return await m.save(),m}}}},function(e,t){e.exports=require("graphql")},function(e,t){e.exports=require("apollo-server-lambda")},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("@sentry/node")},function(e,t){e.exports=require("graphql-tools")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("jwks-rsa")},function(e,t){e.exports=require("graphql/language")},function(e,t){e.exports=require("encoding")},function(e,t,r){"use strict";r.r(t);var n=r(7),i=r(0),o=r.n(i),a=r(8),s=r(9),u=(r(14),r(10)),c=r(11),l=r.n(c),d=r(12),p=r.n(d),g=r(5),b=r(4),f=r(6);var y=new f.GraphQLScalarType({name:"Coordinates",description:"A set of coordinates. x, y",parseValue:e=>e,serialize:e=>e,parseLiteral:e=>e.value}),m=r(13);var S={Date:new f.GraphQLScalarType({name:"Date",description:"Date custom scalar type",parseValue:e=>new Date(e),serialize:e=>e.getTime(),parseLiteral:e=>e.kind===m.Kind.INT?new Date(e.value):null})};function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"handler",(function(){return I}));const w=p()({jwksUri:"https://dev-yxi32afc.auth0.com/.well-known/jwks.json"}),O=(e,t)=>{w.getSigningKey(e.kid,(e,r)=>{const n=r.publicKey||r.rsaPublicKey;t(null,n)})},j={audience:process.env.AUTH0_AUDIENCE,issuer:"https://dev-yxi32afc.auth0.com/",algorithms:["RS256"]};Object(a.config)(),s.init({dsn:"https://4de26209a3c44912b676ef8013081e8b@sentry.io/4754945"});(async()=>{await o.a.connect(process.env.DB_HOST,{useNewUrlParser:!0,useUnifiedTopology:!0})})();const I=new n.ApolloServer({schema:Object(u.makeExecutableSchema)({typeDefs:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},b.default,{geoPointScalar:y,dateScalar:S}),resolvers:g.resolvers}),context:({event:e})=>{if(e.headers.authorization){const t=e.headers.authorization.replace("Bearer ","");if(t.length){return{id:new Promise((e,r)=>{l.a.verify(t,O,j,(t,n)=>t?r(t):e(n["https://rentersreview.co/uuid"]))})}}}}}).createHandler({cors:{origin:"*",credentials:!0}})}]));