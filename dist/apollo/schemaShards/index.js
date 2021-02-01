"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const file_1 = tslib_1.__importDefault(require("./file"));
const mergeRawSchemas_1 = tslib_1.__importDefault(require("../../util/mergeRawSchemas"));
exports.default = mergeRawSchemas_1.default(file_1.default);
