"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_fastify_1 = require("apollo-server-fastify");
const mergeRawSchemas_1 = tslib_1.__importDefault(require("../util/mergeRawSchemas"));
const schemaShards_1 = tslib_1.__importDefault(require("./schemaShards"));
exports.default = mergeRawSchemas_1.default({
    typeDefs: [
        apollo_server_fastify_1.gql `
        type Query {
          _empty: String
        }
        type Mutation {
          _empty: String
        }
      `,
    ],
    resolvers: {},
}, schemaShards_1.default);
