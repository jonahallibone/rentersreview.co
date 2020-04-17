!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=16)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("apollo-server")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("qs")},function(e,t){e.exports=require("geocodio-library-node")},function(e,t,r){"use strict";r.r(t);var n=r(1);const i=n.gql`
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
`;t.default=i},function(e,t,r){"use strict";r.r(t);var n=r(2),i=r.n(n),o=r(3),a=r.n(o),s=r(1),u=r(4),l=r.n(u),c=r(0),d=r.n(c);var p=d.a.model("Review",d.a.Schema({apartment:String,building:{type:c.Schema.Types.ObjectId,ref:"Building"},rent:Number,bedrooms:Number,bathrooms:Number,amenities:[String],leaseLength:String,leaseYearStart:Number,leaseYearEnd:Number,landlordRating:Number,neighborhoodRating:Number,transportRating:Number,review:String,createdAt:Date},{timestamps:!0}));const g=d.a.model("Building",{buildingId:String,street:String,borough:String,streetNumber:String,zipcode:String,complaints:[String],location:{type:{type:String,enum:["Point"],required:!0},coordinates:{type:[Number],required:!0}}},"buildings");r.d(t,"resolvers",(function(){return y}));const m=new l.a("906e226650616fafe25e522fe92a692101a2021"),y={Query:{reviews:async()=>await p.find().limit(10).populate("building"),getBuildingReviews:async(e,t,{id:r})=>{const n=await p.find({building:t.id});return console.log(n),n},getApartment:async(e,t,{id:r})=>{if(await r)return p.findById(t.id)},getBuilding:async(e,t,{id:r})=>{try{return await g.findById(t.id)}catch(e){throw console.error(e),new Error(e)}},getBuildingViolations:async(e,t,{id:r})=>{const n=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/wvxf-dwi5.json",timeout:1e3,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),o=a.a.stringify({$where:`buildingid=${t.buildingId}`,$select:"class,apartment,inspectiondate,novdescription,violationid,violationstatus",$order:"inspectiondate DESC",$limit:t.limit},{encodeValuesOnly:!0});try{const e=await n.get(`?${o}`),{data:t}=e;return t.map(e=>{var t,r,n,i,o;return{status:null!==(t=e.violationstatus)&&void 0!==t?t:"",violationid:e.violationid,apartment:null!==(r=e.apartment)&&void 0!==r?r:"Unknown",class:null!==(n=e.class)&&void 0!==n?n:"Unknown",inspectionDate:null!==(i=e.inspectiondate)&&void 0!==i?i:"Unknown",description:null!==(o=e.novdescription)&&void 0!==o?o:"Unknown"}})}catch(e){throw console.error(e),new Error(e)}},getBuildingComplaints:async(e,t,{id:r})=>{const n=await g.findOne({buildingId:t.buildingId});if(!n||!n.complaints.length)return[];const o=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/a2nx-4u46.json",timeout:1e4,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),s=a.a.stringify({$where:`complaintid in(${n.complaints.join(",")})`,$select:["complaintid","problemid","unittype","spacetype","type","majorcategory","minorcategory","code","status","statusdate","statusdescription"].join(","),$order:"statusdate DESC",$limit:t.limit},{encodeValuesOnly:!0});try{const e=await o.get(`?${s}`),{data:t}=e;return t.length?t.map(e=>{const{complaintid:t,problemid:r,unittype:n,spacetype:i,type:o,majorcategory:a,minorcategory:s,code:u,status:l,statusdate:c,statusdescription:d}=e;return{complaintId:t,problemId:r,unitType:n,spaceType:i,urgency:o,majorCategory:a,minorCategory:s,code:u,status:l,statusDate:c,statusDescription:d}}):[]}catch(e){throw console.error(e),new Error(e)}},SearchBuildings:async(e,t,{id:r})=>{await r;const n=await g.aggregate([{$searchBeta:{compound:{must:{text:{query:t.query.split(" "),path:["streetNumber"]}},should:{phrase:{query:t.query.split(" "),path:["street"],slop:0}}}}},{$facet:{paginatedResults:[{$skip:0},{$limit:5}],totalCount:[{$count:"count"}]}}]);return{buildings:n[0].paginatedResults,total:n[0].totalCount[0].count}}},Mutation:{createReview:async(e,{address:t,location:r,apartment:n,rent:o,bedrooms:u,bathrooms:l,amenities:c,leaseLength:d,leaseYearStart:y,leaseYearEnd:b,landlordRating:f,neighborhoodRating:w,transportRating:h,review:S})=>{const v={streetNumber:t.streetNumber,street:t.street.toUpperCase(),borough:t.city.toUpperCase()};try{const e=await g.findOne(v),I=async e=>{if(!e){const e=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/kj4p-ruqc.json",timeout:1e4,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),r=["buildingid"],n=a.a.stringify({$where:`streetname='${t.street.toUpperCase()}' AND housenumber='${t.streetNumber}' AND zip='${t.zipcode}'`,$select:r.join(",")},{encodeValuesOnly:!0});try{const r=await e.get(`?${n}`),{data:i}=r,o=await m.geocode(`${t.streetNumber} ${t.street}, ${t.city} NY, ${t.zipcode}`);if(console.log(o),!o.results.length)throw new s.UserInputError("Address invalid");const a=new g({buildingId:i[0].buildingid,street:t.street.toUpperCase(),borough:t.city.toUpperCase(),streetNumber:t.streetNumber,zipcode:t.zipcode,complaints:[],location:{type:"Point",coordinates:[o.results[0].location.lng,o.results[0].location.lat]}});return await a.save(),a._id}catch(e){throw console.log(e),new s.UserInputError(e)}}return e._id},j=await I(e),D=new p({location:{type:"Point",coordinates:r},building:j,apartment:n,rent:o,bedrooms:u,bathrooms:l,amenities:c,leaseLength:d,leaseYearStart:y,leaseYearEnd:b,landlordRating:f,neighborhoodRating:w,transportRating:h,review:S});return await D.save(),D}catch(e){throw new Error(e)}}}}},function(e,t){e.exports=require("graphql")},function(e,t){e.exports=require("apollo-server-lambda")},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("@sentry/node")},function(e,t){e.exports=require("graphql-tools")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("jwks-rsa")},function(e,t){e.exports=require("graphql/language")},function(e,t){e.exports=require("encoding")},function(e,t,r){"use strict";r.r(t);var n=r(8),i=r(0),o=r.n(i),a=r(9),s=r(10),u=(r(15),r(11)),l=r(12),c=r.n(l),d=r(13),p=r.n(d),g=r(6),m=r(5),y=r(7);var b=new y.GraphQLScalarType({name:"Coordinates",description:"A set of coordinates. x, y",parseValue:e=>e,serialize:e=>e,parseLiteral:e=>e.value}),f=r(14);var w={Date:new y.GraphQLScalarType({name:"Date",description:"Date custom scalar type",parseValue:e=>new Date(e),serialize:e=>e.getTime(),parseLiteral:e=>e.kind===f.Kind.INT?new Date(e.value):null})};function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function S(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"handler",(function(){return D})),s.init({dsn:"https://4de26209a3c44912b676ef8013081e8b@sentry.io/4754945"});const v=p()({jwksUri:"https://login.rentersreview.co/.well-known/jwks.json"}),I=(e,t)=>{v.getSigningKey(e.kid,(e,r)=>{const n=r.publicKey||r.rsaPublicKey;t(null,n)})},j={audience:process.env.AUTH0_AUDIENCE,issuer:"https://login.rentersreview.co/",algorithms:["RS256"]};Object(a.config)();(async()=>{await o.a.connect(process.env.DB_HOST,{useNewUrlParser:!0,useUnifiedTopology:!0})})();const D=new n.ApolloServer({schema:Object(u.makeExecutableSchema)({typeDefs:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){S(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},m.default,{geoPointScalar:b,dateScalar:w}),resolvers:g.resolvers}),context:({event:e})=>{if(e.headers.authorization){const t=e.headers.authorization.replace("Bearer ","");if(t.length){return{id:new Promise((e,r)=>{c.a.verify(t,I,j,(t,n)=>t?r(t):e(n["https://rentersreview.co/uuid"]))})}}}}}).createHandler({cors:{origin:"*",credentials:!0}})}]));