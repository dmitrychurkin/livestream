"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_fastify_1 = require("apollo-server-fastify");
exports.default = apollo_server_fastify_1.gql `
  extend type Mutation {
    uploadFile(file: Upload!): Boolean!
  }
`;
