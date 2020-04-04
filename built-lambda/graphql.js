!function(t,e){for(var r in e)t[r]=e[r]}(exports,function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=15)}([function(t,e){t.exports=require("mongoose")},function(t,e){t.exports=require("axios")},function(t,e){t.exports=require("qs")},function(t,e){t.exports=require("apollo-server")},function(t,e,r){"use strict";r.r(e);var n=r(3);const i=n.gql`
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
`;e.default=i},function(t,e,r){"use strict";r.r(e);var n=r(1),i=r.n(n),o=r(2),a=r.n(o),s=r(0),u=r.n(s);const c=u.a.model("Apartment",{address:{street:String,city:String,state:String,zipcode:String},location:{type:{type:String,enum:["Point"],required:!0},coordinates:{type:[Number],required:!0}},apartment:String,rent:Number,bedrooms:Number,bathrooms:Number,amenities:[String],leaseLength:String,leaseYearStart:Number,leaseYearEnd:Number,landlordRating:Number,neighborhoodRating:Number,transportRating:Number,review:String}),l=u.a.model("Building",{buildingId:String,street:String,borough:String,streetNumber:String,zipcode:String,complaints:[String],location:{type:{type:String,enum:["Point"],required:!0},coordinates:{type:[Number],required:!0}}},"buildings");function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(Object(r),!0).forEach((function(e){g(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function g(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"resolvers",(function(){return y}));const y={Query:{apartments:()=>c.find(),getApartment:async(t,e,{id:r})=>{if(await r)return c.findById(e.id)},getBuilding:async(t,e,{id:r})=>{try{return await l.findById(e.id)}catch(t){throw console.error(t),new Error(t)}},getBuildingViolations:async(t,e,{id:r})=>{const n=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/wvxf-dwi5.json",timeout:1e3,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),o=a.a.stringify({$where:`buildingid=${e.buildingId}`,$select:"class,apartment,inspectiondate,novdescription,violationid,violationstatus",$order:"inspectiondate DESC",$limit:e.limit},{encodeValuesOnly:!0});try{const t=await n.get(`?${o}`),{data:e}=t;return e.map(t=>{var e,r,n,i,o;return{status:null!==(e=t.violationstatus)&&void 0!==e?e:"",violationid:t.violationid,apartment:null!==(r=t.apartment)&&void 0!==r?r:"Unknown",class:null!==(n=t.class)&&void 0!==n?n:"Unknown",inspectionDate:null!==(i=t.inspectiondate)&&void 0!==i?i:"Unknown",description:null!==(o=t.novdescription)&&void 0!==o?o:"Unknown"}})}catch(t){throw console.error(t),new Error(t)}},getBuildingComplaints:async(t,e,{id:r})=>{const n=await l.findOne({buildingId:e.buildingId});if(!n||!n.complaints.length)return[];const o=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/a2nx-4u46.json",timeout:1e4,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),s=a.a.stringify({$where:`complaintid in(${n.complaints.join(",")})`,$select:["complaintid","problemid","unittype","spacetype","type","majorcategory","minorcategory","code","status","statusdate","statusdescription"].join(","),$order:"statusdate DESC",$limit:e.limit},{encodeValuesOnly:!0});try{const t=await o.get(`?${s}`),{data:e}=t;return e.length?e.map(t=>{const{complaintid:e,problemid:r,unittype:n,spacetype:i,type:o,majorcategory:a,minorcategory:s,code:u,status:c,statusdate:l,statusdescription:d}=t;return{complaintId:e,problemId:r,unitType:n,spaceType:i,urgency:o,majorCategory:a,minorCategory:s,code:u,status:c,statusDate:l,statusDescription:d}}):[]}catch(t){throw console.error(t),new Error(t)}},SearchBuildings:async(t,e,{id:r})=>{await r;const n=await l.aggregate([{$searchBeta:{compound:{must:{text:{query:e.query.split(" "),path:["streetNumber"]}},should:{phrase:{query:e.query.split(" "),path:["street"],slop:0}}}}},{$facet:{paginatedResults:[{$skip:0},{$limit:5}],totalCount:[{$count:"count"}]}}]);return{buildings:n[0].paginatedResults,total:n[0].totalCount[0].count}}},Mutation:{createApartment:async(t,{address:e,location:r,apartment:n,rent:i,bedrooms:o,bathrooms:a,amenities:s,leaseLength:u,leaseYearStart:l,leaseYearEnd:d,landlordRating:g,neighborhoodRating:y,transportRating:m,review:b})=>{const f=new c({address:p({},e),location:{type:"Point",coordinates:r},apartment:n,rent:i,bedrooms:o,bathrooms:a,amenities:s,leaseLength:u,leaseYearStart:l,leaseYearEnd:d,landlordRating:g,neighborhoodRating:y,transportRating:m,review:b});return await f.save(),f}}}},function(t,e){t.exports=require("graphql")},function(t,e){t.exports=require("apollo-server-lambda")},function(t,e){t.exports=require("dotenv")},function(t,e){t.exports=require("@sentry/node")},function(t,e){t.exports=require("graphql-tools")},function(t,e){t.exports=require("jsonwebtoken")},function(t,e){t.exports=require("jwks-rsa")},function(t,e){t.exports=require("graphql/language")},function(t,e){t.exports=require("encoding")},function(t,e,r){"use strict";r.r(e);var n=r(7),i=r(0),o=r.n(i),a=r(8),s=r(9),u=(r(14),r(10)),c=r(11),l=r.n(c),d=r(12),p=r.n(d),g=r(5),y=r(4),m=r(6);var b=new m.GraphQLScalarType({name:"Coordinates",description:"A set of coordinates. x, y",parseValue:t=>t,serialize:t=>t,parseLiteral:t=>t.value}),f=r(13);var S={Date:new m.GraphQLScalarType({name:"Date",description:"Date custom scalar type",parseValue:t=>new Date(t),serialize:t=>t.getTime(),parseLiteral:t=>t.kind===f.Kind.INT?new Date(t.value):null})};function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function v(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"handler",(function(){return I}));const w=p()({jwksUri:"https://dev-yxi32afc.auth0.com/.well-known/jwks.json"}),O=(t,e)=>{w.getSigningKey(t.kid,(t,r)=>{const n=r.publicKey||r.rsaPublicKey;e(null,n)})},j={audience:process.env.AUTH0_AUDIENCE,issuer:"https://dev-yxi32afc.auth0.com/",algorithms:["RS256"]};Object(a.config)(),s.init({dsn:"https://4de26209a3c44912b676ef8013081e8b@sentry.io/4754945"});(async()=>{await o.a.connect(process.env.DB_HOST,{useNewUrlParser:!0,useUnifiedTopology:!0})})();const I=new n.ApolloServer({schema:Object(u.makeExecutableSchema)({typeDefs:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){v(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},y.default,{geoPointScalar:b,dateScalar:S}),resolvers:g.resolvers}),context:({event:t})=>{if(t.headers.authorization){const e=t.headers.authorization.replace("Bearer ","");if(e.length){return{id:new Promise((t,r)=>{l.a.verify(e,O,j,(e,n)=>e?r(e):t(n["https://rentersreview.co/uuid"]))})}}}}}).createHandler({cors:{origin:"*",credentials:!0}})}]));