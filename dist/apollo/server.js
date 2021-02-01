"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_fastify_1 = require("apollo-server-fastify");
const schema_1 = tslib_1.__importDefault(require("./schema"));
exports.default = new apollo_server_fastify_1.ApolloServer({ ...schema_1.default });
