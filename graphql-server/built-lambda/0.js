exports.ids = [0];
exports.modules = {

/***/ "../../node_modules/apollo-server-lambda/dist/ApolloServer.js":
/*!************************************************************************************************************************!*\
  !*** /Users/jonahallibone/code/rentersreview.co/graphql-server/node_modules/apollo-server-lambda/dist/ApolloServer.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = __webpack_require__(/*! apollo-server-core */ "../../node_modules/apollo-server-core/dist/index.js");
const graphql_playground_html_1 = __webpack_require__(/*! @apollographql/graphql-playground-html */ "../../node_modules/@apollographql/graphql-playground-html/dist/index.js");
const lambdaApollo_1 = __webpack_require__(/*! ./lambdaApollo */ "../../node_modules/apollo-server-lambda/dist/lambdaApollo.js");
const apollo_server_env_1 = __webpack_require__(/*! apollo-server-env */ "../../node_modules/apollo-server-env/dist/index.js");
class ApolloServer extends apollo_server_core_1.ApolloServerBase {
    constructor(options) {
        if (process.env.ENGINE_API_KEY || options.engine) {
            options.engine = Object.assign({ sendReportsImmediately: true }, (typeof options.engine !== 'boolean' ? options.engine : {}));
        }
        super(options);
    }
    createGraphQLServerOptions(event, context) {
        return super.graphQLServerOptions({ event, context });
    }
    createHandler({ cors, onHealthCheck } = { cors: undefined, onHealthCheck: undefined }) {
        const promiseWillStart = this.willStart();
        const corsHeaders = new apollo_server_env_1.Headers();
        if (cors) {
            if (cors.methods) {
                if (typeof cors.methods === 'string') {
                    corsHeaders.set('access-control-allow-methods', cors.methods);
                }
                else if (Array.isArray(cors.methods)) {
                    corsHeaders.set('access-control-allow-methods', cors.methods.join(','));
                }
            }
            if (cors.allowedHeaders) {
                if (typeof cors.allowedHeaders === 'string') {
                    corsHeaders.set('access-control-allow-headers', cors.allowedHeaders);
                }
                else if (Array.isArray(cors.allowedHeaders)) {
                    corsHeaders.set('access-control-allow-headers', cors.allowedHeaders.join(','));
                }
            }
            if (cors.exposedHeaders) {
                if (typeof cors.exposedHeaders === 'string') {
                    corsHeaders.set('access-control-expose-headers', cors.exposedHeaders);
                }
                else if (Array.isArray(cors.exposedHeaders)) {
                    corsHeaders.set('access-control-expose-headers', cors.exposedHeaders.join(','));
                }
            }
            if (cors.credentials) {
                corsHeaders.set('access-control-allow-credentials', 'true');
            }
            if (typeof cors.maxAge === 'number') {
                corsHeaders.set('access-control-max-age', cors.maxAge.toString());
            }
        }
        return (event, context, callback) => {
            const eventHeaders = new apollo_server_env_1.Headers(event.headers);
            const requestCorsHeaders = new apollo_server_env_1.Headers(corsHeaders);
            if (cors && cors.origin) {
                const requestOrigin = eventHeaders.get('origin');
                if (typeof cors.origin === 'string') {
                    requestCorsHeaders.set('access-control-allow-origin', cors.origin);
                }
                else if (requestOrigin &&
                    (typeof cors.origin === 'boolean' ||
                        (Array.isArray(cors.origin) &&
                            requestOrigin &&
                            cors.origin.includes(requestOrigin)))) {
                    requestCorsHeaders.set('access-control-allow-origin', requestOrigin);
                }
                const requestAccessControlRequestHeaders = eventHeaders.get('access-control-request-headers');
                if (!cors.allowedHeaders && requestAccessControlRequestHeaders) {
                    requestCorsHeaders.set('access-control-allow-headers', requestAccessControlRequestHeaders);
                }
            }
            const requestCorsHeadersObject = Array.from(requestCorsHeaders).reduce((headersObject, [key, value]) => {
                headersObject[key] = value;
                return headersObject;
            }, {});
            if (event.httpMethod === 'OPTIONS') {
                context.callbackWaitsForEmptyEventLoop = false;
                return callback(null, {
                    body: '',
                    statusCode: 204,
                    headers: Object.assign({}, requestCorsHeadersObject),
                });
            }
            if (event.path === '/.well-known/apollo/server-health') {
                const successfulResponse = {
                    body: JSON.stringify({ status: 'pass' }),
                    statusCode: 200,
                    headers: Object.assign({ 'Content-Type': 'application/json' }, requestCorsHeadersObject),
                };
                if (onHealthCheck) {
                    onHealthCheck(event)
                        .then(() => {
                        return callback(null, successfulResponse);
                    })
                        .catch(() => {
                        return callback(null, {
                            body: JSON.stringify({ status: 'fail' }),
                            statusCode: 503,
                            headers: Object.assign({ 'Content-Type': 'application/json' }, requestCorsHeadersObject),
                        });
                    });
                }
                else {
                    return callback(null, successfulResponse);
                }
            }
            if (this.playgroundOptions && event.httpMethod === 'GET') {
                const acceptHeader = event.headers['Accept'] || event.headers['accept'];
                if (acceptHeader && acceptHeader.includes('text/html')) {
                    const path = event.path ||
                        (event.requestContext && event.requestContext.path) ||
                        '/';
                    const playgroundRenderPageOptions = Object.assign({ endpoint: path }, this.playgroundOptions);
                    return callback(null, {
                        body: graphql_playground_html_1.renderPlaygroundPage(playgroundRenderPageOptions),
                        statusCode: 200,
                        headers: Object.assign({ 'Content-Type': 'text/html' }, requestCorsHeadersObject),
                    });
                }
            }
            const callbackFilter = (error, result) => {
                callback(error, result && Object.assign(Object.assign({}, result), { headers: Object.assign(Object.assign({}, result.headers), requestCorsHeadersObject) }));
            };
            lambdaApollo_1.graphqlLambda(() => __awaiter(this, void 0, void 0, function* () {
                yield promiseWillStart;
                return this.createGraphQLServerOptions(event, context);
            }))(event, context, callbackFilter);
        };
    }
}
exports.ApolloServer = ApolloServer;
//# sourceMappingURL=ApolloServer.js.map

/***/ }),

/***/ "../../node_modules/apollo-server-lambda/dist/index.js":
/*!*****************************************************************************************************************!*\
  !*** /Users/jonahallibone/code/rentersreview.co/graphql-server/node_modules/apollo-server-lambda/dist/index.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_core_1 = __webpack_require__(/*! apollo-server-core */ "../../node_modules/apollo-server-core/dist/index.js");
exports.GraphQLUpload = apollo_server_core_1.GraphQLUpload;
exports.GraphQLExtension = apollo_server_core_1.GraphQLExtension;
exports.gql = apollo_server_core_1.gql;
exports.ApolloError = apollo_server_core_1.ApolloError;
exports.toApolloError = apollo_server_core_1.toApolloError;
exports.SyntaxError = apollo_server_core_1.SyntaxError;
exports.ValidationError = apollo_server_core_1.ValidationError;
exports.AuthenticationError = apollo_server_core_1.AuthenticationError;
exports.ForbiddenError = apollo_server_core_1.ForbiddenError;
exports.UserInputError = apollo_server_core_1.UserInputError;
exports.defaultPlaygroundOptions = apollo_server_core_1.defaultPlaygroundOptions;
__export(__webpack_require__(/*! graphql-tools */ "../../node_modules/graphql-tools/dist/index.js"));
var ApolloServer_1 = __webpack_require__(/*! ./ApolloServer */ "../../node_modules/apollo-server-lambda/dist/ApolloServer.js");
exports.ApolloServer = ApolloServer_1.ApolloServer;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/apollo-server-lambda/dist/lambdaApollo.js":
/*!************************************************************************************************************************!*\
  !*** /Users/jonahallibone/code/rentersreview.co/graphql-server/node_modules/apollo-server-lambda/dist/lambdaApollo.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = __webpack_require__(/*! apollo-server-core */ "../../node_modules/apollo-server-core/dist/index.js");
const apollo_server_env_1 = __webpack_require__(/*! apollo-server-env */ "../../node_modules/apollo-server-env/dist/index.js");
function graphqlLambda(options) {
    if (!options) {
        throw new Error('Apollo Server requires options.');
    }
    if (arguments.length > 1) {
        throw new Error(`Apollo Server expects exactly one argument, got ${arguments.length}`);
    }
    const graphqlHandler = (event, context, callback) => {
        context.callbackWaitsForEmptyEventLoop = false;
        if (event.httpMethod === 'POST' && !event.body) {
            return callback(null, {
                body: 'POST body missing.',
                statusCode: 500,
            });
        }
        apollo_server_core_1.runHttpQuery([event, context], {
            method: event.httpMethod,
            options: options,
            query: event.httpMethod === 'POST' && event.body
                ? JSON.parse(event.body)
                : event.queryStringParameters,
            request: {
                url: event.path,
                method: event.httpMethod,
                headers: new apollo_server_env_1.Headers(event.headers),
            },
        }).then(({ graphqlResponse, responseInit }) => {
            callback(null, {
                body: graphqlResponse,
                statusCode: 200,
                headers: responseInit.headers,
            });
        }, (error) => {
            if ('HttpQueryError' !== error.name)
                return callback(error);
            callback(null, {
                body: error.message,
                statusCode: error.statusCode,
                headers: error.headers,
            });
        });
    };
    return graphqlHandler;
}
exports.graphqlLambda = graphqlLambda;
//# sourceMappingURL=lambdaApollo.js.map

/***/ })

};;