import { gql } from "apollo-server-fastify";

export default gql`
  extend type Mutation {
    uploadFile(file: Upload!): Boolean!
  }
`;
