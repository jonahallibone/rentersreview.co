import { ApolloServer } from "apollo-server-lambda";
import mongoose from "mongoose";
import { config } from "dotenv";
import * as Sentry from "@sentry/node";
import encoding from "encoding";
import { makeExecutableSchema } from "graphql-tools";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { resolvers } from "./resolvers";
import typeDefs from "./typeDefs";
import { geoPointScalar } from "./scalars/Geopoint";

const client = jwksClient({
  jwksUri: `https://dev-yxi32afc.auth0.com/.well-known/jwks.json`
});

const getKey = (header, cb) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
};

const options = {
  audience: process.env.AUTH0_AUDIENCE,
  issuer: "https://dev-yxi32afc.auth0.com/",
  algorithms: ["RS256"]
};

config();

Sentry.init({
  dsn: "https://4de26209a3c44912b676ef8013081e8b@sentry.io/4754945"
});

const startServer = async () => {
  await mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

startServer();

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: { ...typeDefs, geoPointScalar },
    resolvers
  }),
  context: ({ event }) => {
    if (event.headers.authorization) {
      const token = event.headers.authorization.replace("Bearer ", "");
      if (token.length) {
        const id = new Promise((resolve, reject) => {
          jwt.verify(token, getKey, options, (err, decoded) => {
            if (err) {
              return reject(err);
            }
            return resolve(decoded["https://rentersreview.co/uuid"]);
          });
        });

        return {
          id
        };
      }
    }
  }
});

// eslint-disable-next-line import/prefer-default-export
export const handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
