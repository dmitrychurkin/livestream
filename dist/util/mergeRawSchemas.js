"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_mergewith_1 = tslib_1.__importDefault(require("lodash.mergewith"));
exports.default = (...schemas) => {
    return lodash_mergewith_1.default({}, ...schemas, customizer);
};
function customizer(objValue, srcValue) {
    if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
    return;
}
