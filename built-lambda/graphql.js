!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=16)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("apollo-server")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("qs")},function(e,t){e.exports=require("geocodio-library-node")},function(e,t,n){"use strict";n.r(t);var r=n(1);const i=r.gql`
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
    totalReviews: Int
    averageRating: Float
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
    leaseYearStart: String
    leaseYearEnd: String
    landlordRating: Int!
    neighborhoodRating: Int!
    transportRating: Int!
    noiseRating: Int!
    safetyRating: Int!
    maintenanceRating: Int!
    review: String!
    createdAt: Date
    updatedAt: Date
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
    statusDate: Date
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
      leaseYearStart: Int
      leaseYearEnd: Int
      landlordRating: Int!
      neighborhoodRating: Int!
      transportRating: Int!
      noiseRating: Int!
      safetyRating: Int!
      maintenanceRating: Int!
      review: String
    ): Review!
  }
`;t.default=i},function(e,t,n){"use strict";n.r(t);var r=n(2),i=n.n(r),a=n(3),o=n.n(a),s=n(1),c=n(4),u=n.n(c),d=n(0),l=n.n(d);var g=l.a.model("Review",l.a.Schema({apartment:String,building:{type:d.Schema.Types.ObjectId,ref:"Building"},rent:Number,bedrooms:Number,bathrooms:Number,amenities:[String],leaseLength:String,leaseYearStart:Number,leaseYearEnd:Number,landlordRating:Number,neighborhoodRating:Number,transportRating:Number,noiseRating:Number,maintenanceRating:Number,safetyRating:Number,recommended:String,review:String,createdAt:Date},{timestamps:!0}));const{ObjectId:p}=l.a.Types,m=l.a.Schema({buildingId:String,street:String,borough:String,streetNumber:String,zipcode:String,complaints:[String],averageRating:{type:Number,default:0},totalReviews:{type:Number,default:0},location:{type:{type:String,enum:["Point"],required:!0},coordinates:{type:[Number],required:!0}}}),y=l.a.model("Building",m,"buildings");n.d(t,"resolvers",(function(){return f}));const b=new u.a("906e226650616fafe25e522fe92a692101a2021"),f={Query:{reviews:async()=>await g.find().limit(10).populate("building").sort({createdAt:"descending"}).select("-leaseLength"),getBuildingReviews:async(e,t,{id:n})=>{const r=await g.find({building:t.id});return console.log(r),r},getReview:async(e,t,{id:n})=>{if(await n)return g.findById(t.id)},getBuilding:async(e,t,{id:n})=>{try{return await y.findById(t.id)}catch(e){throw console.error(e),new Error(e)}},getBuildingViolations:async(e,t,{id:n})=>{const r=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/wvxf-dwi5.json",timeout:1e3,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),a=o.a.stringify({$where:`buildingid=${t.buildingId}`,$select:"class,apartment,inspectiondate,novdescription,violationid,violationstatus",$order:"inspectiondate DESC",$limit:t.limit},{encodeValuesOnly:!0});try{const e=await r.get(`?${a}`),{data:t}=e;return t.map(e=>{var t,n,r,i,a;return{status:null!==(t=e.violationstatus)&&void 0!==t?t:"",violationid:e.violationid,apartment:null!==(n=e.apartment)&&void 0!==n?n:"Unknown",class:null!==(r=e.class)&&void 0!==r?r:"Unknown",inspectionDate:null!==(i=e.inspectiondate)&&void 0!==i?i:"Unknown",description:null!==(a=e.novdescription)&&void 0!==a?a:"Unknown"}})}catch(e){throw console.error(e),new Error(e)}},getBuildingComplaints:async(e,t,{id:n})=>{const r=await y.findOne({buildingId:t.buildingId});if(!r||!r.complaints.length)return[];const a=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/a2nx-4u46.json",timeout:1e4,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),s=o.a.stringify({$where:`complaintid in(${r.complaints.join(",")})`,$select:["complaintid","problemid","unittype","spacetype","type","majorcategory","minorcategory","code","status","statusdate","statusdescription"].join(","),$order:"statusdate DESC",$limit:t.limit},{encodeValuesOnly:!0});try{const e=await a.get(`?${s}`),{data:t}=e;return t.length?t.map(e=>{const{complaintid:t,problemid:n,unittype:r,spacetype:i,type:a,majorcategory:o,minorcategory:s,code:c,status:u,statusdate:d,statusdescription:l}=e;return{complaintId:t,problemId:n,unitType:r,spaceType:i,urgency:a,majorCategory:o,minorCategory:s,code:c,status:u,statusDate:d,statusDescription:l}}):[]}catch(e){throw console.error(e),new Error(e)}},getNearbyBuildings:async(e,t,{id:n})=>{const r=await y.findById(t.buildingId);return await y.find({_id:{$ne:t.buildingId},location:{$nearSphere:{$geometry:{type:"Point",coordinates:r.location.coordinates},$maxDistance:402.335}}}).limit(3)},SearchBuildings:async(e,t,{id:n})=>{const r=await y.aggregate([{$searchBeta:{compound:{must:{text:{query:t.query.split(" "),path:["streetNumber"]}},should:{phrase:{query:t.query.split(" "),path:["street"],slop:0}}}}},{$facet:{paginatedResults:[{$skip:0},{$limit:5}],totalCount:[{$count:"count"}]}}]);return{buildings:r[0].paginatedResults,total:r[0].totalCount[0].count}}},Mutation:{createReview:async(e,{address:t,location:n,apartment:r,rent:a,bedrooms:c,bathrooms:u,amenities:d,leaseYearStart:l,leaseYearEnd:m,landlordRating:f,neighborhoodRating:w,transportRating:v,noiseRating:h,maintenanceRating:S,safetyRating:R,recommended:I,review:$})=>{const D={streetNumber:t.streetNumber,street:t.street.toUpperCase(),borough:t.city.toUpperCase()};try{const e=async()=>{const e=await y.findOne(D);if(!e){const e=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/kj4p-ruqc.json",timeout:1e4,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),n=["buildingid"],r=o.a.stringify({$where:`streetname='${t.street.toUpperCase()}' AND housenumber='${t.streetNumber}' AND zip='${t.zipcode}'`,$select:n.join(",")},{encodeValuesOnly:!0});try{const n=await e.get(`?${r}`),{data:i}=n,a=await b.geocode(`${t.streetNumber} ${t.street}, ${t.city} NY, ${t.zipcode}`);if(!a.results.length)throw new s.UserInputError("Address invalid");const o=new y({buildingId:i[0].buildingid,street:t.street.toUpperCase(),borough:t.city.toUpperCase(),streetNumber:t.streetNumber,zipcode:t.zipcode,complaints:[],location:{type:"Point",coordinates:[a.results[0].location.lng,a.results[0].location.lat]}});return await o.save(),o}catch(e){throw console.log(e),new s.UserInputError(e)}}return e},j=await e(),O=new g({location:{type:"Point",coordinates:n},building:j._id,apartment:r,rent:a,bedrooms:c,bathrooms:u,amenities:d,leaseYearStart:l,leaseYearEnd:m,landlordRating:f,neighborhoodRating:w,transportRating:v,noiseRating:h,maintenanceRating:S,safetyRating:R,recommended:I,review:$});await O.save();const[x]=await(async e=>{console.log(e);try{return await y.aggregate([{$match:{_id:p(e)}},{$lookup:{from:"reviews",localField:"_id",foreignField:"building",as:"reviews"}},{$unwind:"$reviews"},{$project:{ratingPerDoc:{$avg:["$reviews.landlordRating","$reviews.neighborhoodRating","$reviews.transportRating","$reviews.noiseRating","$reviews.maintenanceRating","$reviews.safetyRating"]}}},{$group:{_id:"$reviews._id",rating:{$avg:"$ratingPerDoc"},total:{$sum:1}}}])}catch(e){throw new Error(console.error())}})(j._id);return console.log(x),j.averageRating=x.rating,j.totalReviews=x.total,await j.save(),O}catch(e){throw new Error(e)}}}}},function(e,t){e.exports=require("graphql")},function(e,t){e.exports=require("apollo-server-lambda")},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("@sentry/node")},function(e,t){e.exports=require("graphql-tools")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("jwks-rsa")},function(e,t){e.exports=require("graphql/language")},function(e,t){e.exports=require("encoding")},function(e,t,n){"use strict";n.r(t);var r=n(8),i=n(0),a=n.n(i),o=n(9),s=n(10),c=(n(15),n(11)),u=n(12),d=n.n(u),l=n(13),g=n.n(l),p=n(6),m=n(5),y=n(7);var b=new y.GraphQLScalarType({name:"Coordinates",description:"A set of coordinates. x, y",parseValue:e=>e,serialize:e=>e,parseLiteral:e=>e.value}),f=n(14);var w={Date:new y.GraphQLScalarType({name:"Date",description:"Date custom scalar type",parseValue:e=>new Date(e),serialize:e=>e.getTime(),parseLiteral:e=>e.kind===f.Kind.INT?new Date(e.value):null})};function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"handler",(function(){return $})),s.init({dsn:"https://4de26209a3c44912b676ef8013081e8b@sentry.io/4754945"});const S=g()({jwksUri:"https://login.rentersreview.co/.well-known/jwks.json"}),R=(e,t)=>{S.getSigningKey(e.kid,(e,n)=>{if(!e){const e=n.publicKey||n.rsaPublicKey;t(null,e)}})},I={audience:process.env.AUTH0_AUDIENCE,issuer:"https://login.rentersreview.co/",algorithms:["RS256"]};Object(o.config)();(async()=>{await a.a.connect(process.env.DB_HOST,{useNewUrlParser:!0,useUnifiedTopology:!0})})();const $=new r.ApolloServer({schema:Object(c.makeExecutableSchema)({typeDefs:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){h(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},m.default,{geoPointScalar:b,dateScalar:w}),resolvers:p.resolvers}),context:({event:e})=>{if(e.headers.authorization){const t=e.headers.authorization.replace("Bearer ","");if(t.length){return{id:new Promise((e,n)=>{d.a.verify(t,R,I,(t,r)=>t?n(t):e(r["https://rentersreview.co/uuid"]))})}}}}}).createHandler({cors:{origin:"*",credentials:!0}})}]));