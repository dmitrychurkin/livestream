"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typedef_1 = tslib_1.__importDefault(require("./typedef"));
const resolver_1 = tslib_1.__importDefault(require("./resolver"));
exports.default = {
    resolvers: resolver_1.default,
    typeDefs: [typedef_1.default],
};
