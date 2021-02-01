"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const resolvers = {
    Mutation: {
        uploadFile: async (_, { file }) => {
            const { filename, createReadStream } = await file;
            const sourceStream = createReadStream();
            const destStream = fs_1.createWriteStream(filename);
            sourceStream.pipe(destStream);
            return true;
        },
    },
};
exports.default = resolvers;
