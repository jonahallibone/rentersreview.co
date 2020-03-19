(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./graphql.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./graphql.js":
/*!********************!*\
  !*** ./graphql.js ***!
  \********************/
/*! exports provided: handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handler", function() { return handler; });
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolvers */ "./resolvers.js");
/* harmony import */ var _typeDefs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./typeDefs */ "./typeDefs.js");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _sentry_node__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sentry/node */ "@sentry/node");
/* harmony import */ var _sentry_node__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_sentry_node__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var encoding__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! encoding */ "encoding");
/* harmony import */ var encoding__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(encoding__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! graphql-tools */ "graphql-tools");
/* harmony import */ var graphql_tools__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(graphql_tools__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _scalars_Geopoint__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scalars/Geopoint */ "./scalars/Geopoint.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










Object(dotenv__WEBPACK_IMPORTED_MODULE_4__["config"])();
_sentry_node__WEBPACK_IMPORTED_MODULE_5__["init"]({
  dsn: "https://4de26209a3c44912b676ef8013081e8b@sentry.io/4754945"
});

const startServer = async () => {
  await mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.connect(process.env.DB_HOST, {
    useNewUrlParser: true
  });
};

startServer();
const server = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__["ApolloServer"]({
  schema: Object(graphql_tools__WEBPACK_IMPORTED_MODULE_7__["makeExecutableSchema"])({
    typeDefs: _objectSpread({}, _typeDefs__WEBPACK_IMPORTED_MODULE_3__["typeDefs"], {
      geoPointScalar: _scalars_Geopoint__WEBPACK_IMPORTED_MODULE_8__["geoPointScalar"]
    }),
    resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_2__["resolvers"]
  })
});
const handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});

/***/ }),

/***/ "./models/Apartment.js":
/*!*****************************!*\
  !*** ./models/Apartment.js ***!
  \*****************************/
/*! exports provided: Apartment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Apartment", function() { return Apartment; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const Apartment = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model("Apartment", {
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  apartment: String,
  rent: Number,
  bedrooms: Number,
  bathrooms: Number,
  amenities: [String],
  leaseLength: String,
  leaseYearStart: Number,
  leaseYearEnd: Number,
  landlordRating: Number,
  neighborhoodRating: Number,
  transportRating: Number,
  review: String
});


/***/ }),

/***/ "./resolvers.js":
/*!**********************!*\
  !*** ./resolvers.js ***!
  \**********************/
/*! exports provided: resolvers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony import */ var _models_Apartment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/Apartment */ "./models/Apartment.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const resolvers = {
  Query: {
    apartments: () => _models_Apartment__WEBPACK_IMPORTED_MODULE_0__["Apartment"].find(),
    getApartment: (parent, args, context, info) => _models_Apartment__WEBPACK_IMPORTED_MODULE_0__["Apartment"].findById(args.id)
  },
  Mutation: {
    createApartment: async (_, {
      address,
      location,
      apartment,
      rent,
      bedrooms,
      bathrooms,
      amenities,
      leaseLength,
      leaseYearStart,
      leaseYearEnd,
      landlordRating,
      neighborhoodRating,
      transportRating,
      review
    }) => {
      const newApartment = new _models_Apartment__WEBPACK_IMPORTED_MODULE_0__["Apartment"]({
        address: _objectSpread({}, address),
        location: {
          type: "Point",
          coordinates: location
        },
        apartment,
        rent,
        bedrooms,
        bathrooms,
        amenities,
        leaseLength,
        leaseYearStart,
        leaseYearEnd,
        landlordRating,
        neighborhoodRating,
        transportRating,
        review
      });
      await newApartment.save();
      return newApartment;
    }
  }
};

/***/ }),

/***/ "./scalars/Geopoint.js":
/*!*****************************!*\
  !*** ./scalars/Geopoint.js ***!
  \*****************************/
/*! exports provided: geoPointScalar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geoPointScalar", function() { return geoPointScalar; });
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);

const geoPointScalar = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLScalarType"]({
  name: 'Coordinates',
  description: 'A set of coordinates. x, y',

  parseValue(value) {
    return value;
  },

  serialize(value) {
    return value;
  },

  parseLiteral(ast) {
    return ast.value;
  }

});

/***/ }),

/***/ "./typeDefs.js":
/*!*********************!*\
  !*** ./typeDefs.js ***!
  \*********************/
/*! exports provided: typeDefs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDefs", function() { return typeDefs; });
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_0__);

const typeDefs = apollo_server__WEBPACK_IMPORTED_MODULE_0__["gql"]`

  scalar Coordinates

  type Query {
    apartments: [Apartment!]!
    getApartment(id: ID!): Apartment!
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
`;

/***/ }),

/***/ "@sentry/node":
/*!*******************************!*\
  !*** external "@sentry/node" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@sentry/node");

/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "encoding":
/*!***************************!*\
  !*** external "encoding" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("encoding");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),

/***/ "graphql-tools":
/*!********************************!*\
  !*** external "graphql-tools" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ })

/******/ })));