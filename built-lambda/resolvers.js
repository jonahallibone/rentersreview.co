!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("apollo-server")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("qs")},function(e,t){e.exports=require("geocodio-library-node")},,function(e,t,n){"use strict";n.r(t);var r=n(2),i=n.n(r),o=n(3),a=n.n(o),s=n(1),u=n(4),d=n.n(u),c=n(0),l=n.n(c);var p=l.a.model("Review",l.a.Schema({apartment:String,building:{type:c.Schema.Types.ObjectId,ref:"Building"},rent:Number,bedrooms:Number,bathrooms:Number,amenities:[String],leaseLength:String,leaseYearStart:Number,leaseYearEnd:Number,landlordRating:Number,neighborhoodRating:Number,transportRating:Number,review:String,createdAt:Date},{timestamps:!0}));const g=l.a.model("Building",{buildingId:String,street:String,borough:String,streetNumber:String,zipcode:String,complaints:[String],location:{type:{type:String,enum:["Point"],required:!0},coordinates:{type:[Number],required:!0}}},"buildings");n.d(t,"resolvers",(function(){return y}));const m=new d.a("906e226650616fafe25e522fe92a692101a2021"),y={Query:{reviews:async()=>await p.find().limit(10).populate("building"),getBuildingReviews:async(e,t,{id:n})=>{const r=await p.find({building:t.id});return console.log(r),r},getReview:async(e,t,{id:n})=>{if(await n)return p.findById(t.id)},getBuilding:async(e,t,{id:n})=>{try{return await g.findById(t.id)}catch(e){throw console.error(e),new Error(e)}},getBuildingViolations:async(e,t,{id:n})=>{const r=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/wvxf-dwi5.json",timeout:1e3,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),o=a.a.stringify({$where:`buildingid=${t.buildingId}`,$select:"class,apartment,inspectiondate,novdescription,violationid,violationstatus",$order:"inspectiondate DESC",$limit:t.limit},{encodeValuesOnly:!0});try{const e=await r.get(`?${o}`),{data:t}=e;return t.map(e=>{var t,n,r,i,o;return{status:null!==(t=e.violationstatus)&&void 0!==t?t:"",violationid:e.violationid,apartment:null!==(n=e.apartment)&&void 0!==n?n:"Unknown",class:null!==(r=e.class)&&void 0!==r?r:"Unknown",inspectionDate:null!==(i=e.inspectiondate)&&void 0!==i?i:"Unknown",description:null!==(o=e.novdescription)&&void 0!==o?o:"Unknown"}})}catch(e){throw console.error(e),new Error(e)}},getBuildingComplaints:async(e,t,{id:n})=>{const r=await g.findOne({buildingId:t.buildingId});if(!r||!r.complaints.length)return[];const o=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/a2nx-4u46.json",timeout:1e4,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),s=a.a.stringify({$where:`complaintid in(${r.complaints.join(",")})`,$select:["complaintid","problemid","unittype","spacetype","type","majorcategory","minorcategory","code","status","statusdate","statusdescription"].join(","),$order:"statusdate DESC",$limit:t.limit},{encodeValuesOnly:!0});try{const e=await o.get(`?${s}`),{data:t}=e;return t.length?t.map(e=>{const{complaintid:t,problemid:n,unittype:r,spacetype:i,type:o,majorcategory:a,minorcategory:s,code:u,status:d,statusdate:c,statusdescription:l}=e;return{complaintId:t,problemId:n,unitType:r,spaceType:i,urgency:o,majorCategory:a,minorCategory:s,code:u,status:d,statusDate:c,statusDescription:l}}):[]}catch(e){throw console.error(e),new Error(e)}},getNearbyBuildings:async(e,t,{id:n})=>{const r=await g.findById(t.buildingId);return await g.find({_id:{$ne:t.buildingId},location:{$nearSphere:{$geometry:{type:"Point",coordinates:r.location.coordinates},$maxDistance:402.335}}}).limit(3)},SearchBuildings:async(e,t,{id:n})=>{await n;const r=await g.aggregate([{$searchBeta:{compound:{must:{text:{query:t.query.split(" "),path:["streetNumber"]}},should:{phrase:{query:t.query.split(" "),path:["street"],slop:0}}}}},{$facet:{paginatedResults:[{$skip:0},{$limit:5}],totalCount:[{$count:"count"}]}}]);return{buildings:r[0].paginatedResults,total:r[0].totalCount[0].count}}},Mutation:{createReview:async(e,{address:t,location:n,apartment:r,rent:o,bedrooms:u,bathrooms:d,amenities:c,leaseLength:l,leaseYearStart:y,leaseYearEnd:b,landlordRating:f,neighborhoodRating:w,transportRating:h,review:v})=>{const $={streetNumber:t.streetNumber,street:t.street.toUpperCase(),borough:t.city.toUpperCase()};try{const e=await g.findOne($),S=async e=>{if(!e){const e=i.a.create({baseURL:"https://data.cityofnewyork.us/resource/kj4p-ruqc.json",timeout:1e4,headers:{"X-App-Token":"QAbvk83yxp1J8aM76x7YlaJtt"}}),n=["buildingid"],r=a.a.stringify({$where:`streetname='${t.street.toUpperCase()}' AND housenumber='${t.streetNumber}' AND zip='${t.zipcode}'`,$select:n.join(",")},{encodeValuesOnly:!0});try{const n=await e.get(`?${r}`),{data:i}=n,o=await m.geocode(`${t.streetNumber} ${t.street}, ${t.city} NY, ${t.zipcode}`);if(!o.results.length)throw new s.UserInputError("Address invalid");const a=new g({buildingId:i[0].buildingid,street:t.street.toUpperCase(),borough:t.city.toUpperCase(),streetNumber:t.streetNumber,zipcode:t.zipcode,complaints:[],location:{type:"Point",coordinates:[o.results[0].location.lng,o.results[0].location.lat]}});return await a.save(),a._id}catch(e){throw console.log(e),new s.UserInputError(e)}}return e._id},x=await S(e),N=new p({location:{type:"Point",coordinates:n},building:x,apartment:r,rent:o,bedrooms:u,bathrooms:d,amenities:c,leaseLength:l,leaseYearStart:y,leaseYearEnd:b,landlordRating:f,neighborhoodRating:w,transportRating:h,review:v});return await N.save(),N}catch(e){throw new Error(e)}}}}}]));