import { ApolloServer, gql } from "apollo-server-lambda";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { config } from "dotenv";
import * as Sentry from "@sentry/node";
import encoding from "encoding";
import { makeExecutableSchema } from "graphql-tools";
import { geoPointScalar } from "./scalars/Geopoint";

config();
Sentry.init({
  dsn: "https://4de26209a3c44912b676ef8013081e8b@sentry.io/4754945"
});

const startServer = async () => {
  await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
};

startServer();

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: {...typeDefs, geoPointScalar},
    resolvers
  })
});

export const handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
