!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("apollo-server")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("qs")},function(e,t){e.exports=require("geocodio-library-node")},,function(e,t,r){"use strict";r.r(t);var n=r(2),i=r.n(n),o=r(3),a=r.n(o),s=r(1),u=r(4),d=r.n(u),c=r(0),l=r.n(c);var p=l.a.model("Review",l.a.Schema({apartment:String,building:{type:c.Schema.Types.ObjectId,ref:"Building"},rent:Number,bedrooms:Number,bathrooms:Number,amenities:[String],leaseLength:String,leaseYearStart:Number,leaseYearEnd:Number,landlordRating:Number,neighborhoodRating:Number,transportRating:Number,review:String,createdAt:Date},{timestamps:!0}));const g=l.a.model("Building",{buildingId:String,street:String,borough:String,streetNumber:String,zipcode:String,complaints:[String],location:{type:{type:String,enum:["Point"],required:!0},coordinates:{type:[Number],required:!0}}},"buildings");r.d(t,"resolvers",(function(){return y}));const m=new d.a("906e226650616fafe25e522fe92a692101a2021"),y={Query:{reviews:async()=>await p.find().limit(10).populate("building"),getBuildingReviews:async(e,t,{id:r})=>{const n=await p.find({building:t.id});return console.log(n),n},getApartment:async(e,t,{id:r})=>{if(await r)return p.findById(t.id)},getBuilding:async(e,t,{id:r})=>{try{return await g.findById(t.id)}catch(e){throw console.error(e),new Error(e)}},getBuildingViolations:async(e,t,{id:r})=>{const n=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/wvxf-dwi5.json",timeout:1e3,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),o=a.a.stringify({$where:`buildingid=${t.buildingId}`,$select:"class,apartment,inspectiondate,novdescription,violationid,violationstatus",$order:"inspectiondate DESC",$limit:t.limit},{encodeValuesOnly:!0});try{const e=await n.get(`?${o}`),{data:t}=e;return t.map(e=>{var t,r,n,i,o;return{status:null!==(t=e.violationstatus)&&void 0!==t?t:"",violationid:e.violationid,apartment:null!==(r=e.apartment)&&void 0!==r?r:"Unknown",class:null!==(n=e.class)&&void 0!==n?n:"Unknown",inspectionDate:null!==(i=e.inspectiondate)&&void 0!==i?i:"Unknown",description:null!==(o=e.novdescription)&&void 0!==o?o:"Unknown"}})}catch(e){throw console.error(e),new Error(e)}},getBuildingComplaints:async(e,t,{id:r})=>{const n=await g.findOne({buildingId:t.buildingId});if(!n||!n.complaints.length)return[];const o=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/a2nx-4u46.json",timeout:1e4,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),s=a.a.stringify({$where:`complaintid in(${n.complaints.join(",")})`,$select:["complaintid","problemid","unittype","spacetype","type","majorcategory","minorcategory","code","status","statusdate","statusdescription"].join(","),$order:"statusdate DESC",$limit:t.limit},{encodeValuesOnly:!0});try{const e=await o.get(`?${s}`),{data:t}=e;return t.length?t.map(e=>{const{complaintid:t,problemid:r,unittype:n,spacetype:i,type:o,majorcategory:a,minorcategory:s,code:u,status:d,statusdate:c,statusdescription:l}=e;return{complaintId:t,problemId:r,unitType:n,spaceType:i,urgency:o,majorCategory:a,minorCategory:s,code:u,status:d,statusDate:c,statusDescription:l}}):[]}catch(e){throw console.error(e),new Error(e)}},SearchBuildings:async(e,t,{id:r})=>{await r;const n=await g.aggregate([{$searchBeta:{compound:{must:{text:{query:t.query.split(" "),path:["streetNumber"]}},should:{phrase:{query:t.query.split(" "),path:["street"],slop:0}}}}},{$facet:{paginatedResults:[{$skip:0},{$limit:5}],totalCount:[{$count:"count"}]}}]);return{buildings:n[0].paginatedResults,total:n[0].totalCount[0].count}}},Mutation:{createReview:async(e,{address:t,location:r,apartment:n,rent:o,bedrooms:u,bathrooms:d,amenities:c,leaseLength:l,leaseYearStart:y,leaseYearEnd:b,landlordRating:f,neighborhoodRating:w,transportRating:h,review:v})=>{const $={streetNumber:t.streetNumber,street:t.street.toUpperCase(),borough:t.city.toUpperCase()};try{const e=await g.findOne($),S=async e=>{if(!e){const e=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/kj4p-ruqc.json",timeout:1e4,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),r=["buildingid"],n=a.a.stringify({$where:`streetname='${t.street.toUpperCase()}' AND housenumber='${t.streetNumber}' AND zip='${t.zipcode}'`,$select:r.join(",")},{encodeValuesOnly:!0});try{const r=await e.get(`?${n}`),{data:i}=r,o=await m.geocode(`${t.streetNumber} ${t.street}, ${t.city} NY, ${t.zipcode}`);if(console.log(o),!o.results.length)throw new s.UserInputError("Address invalid");const a=new g({buildingId:i[0].buildingid,street:t.street.toUpperCase(),borough:t.city.toUpperCase(),streetNumber:t.streetNumber,zipcode:t.zipcode,complaints:[],location:{type:"Point",coordinates:[o.results[0].location.lng,o.results[0].location.lat]}});return await a.save(),a._id}catch(e){throw console.log(e),new s.UserInputError(e)}}return e._id},x=await S(e),N=new p({location:{type:"Point",coordinates:r},building:x,apartment:n,rent:o,bedrooms:u,bathrooms:d,amenities:c,leaseLength:l,leaseYearStart:y,leaseYearEnd:b,landlordRating:f,neighborhoodRating:w,transportRating:h,review:v});return await N.save(),N}catch(e){throw new Error(e)}}}}}]));