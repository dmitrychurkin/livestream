import { gql } from "apollo-server-fastify";

import mergeRawSchemas from "../util/mergeRawSchemas";

import graphqlSchemaShards from "./schemaShards";

export default mergeRawSchemas(
  {
    typeDefs: [
      gql`
        type Query {
          _empty: String
        }
        type Mutation {
          _empty: String
        }
      `,
    ],
    resolvers: {},
  },
  graphqlSchemaShards
);
