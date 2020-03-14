import { ApolloServer, gql } from "apollo-server-lambda";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { config } from "dotenv";
import encoding from "encoding";

config();

const startServer = async () => {
  await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
  return server;
};

startServer();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

export const handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});