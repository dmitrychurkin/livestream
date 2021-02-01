/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IResolvers } from "apollo-server-fastify";
import { createWriteStream } from "fs";

const resolvers: IResolvers = {
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { filename, createReadStream } = await file;
      const sourceStream = createReadStream();
      const destStream = createWriteStream(filename);
      sourceStream.pipe(destStream);
      return true;
    },
  },
};

export default resolvers;
