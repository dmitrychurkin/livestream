
import { createWriteStream } from 'fs';
import { gql } from 'apollo-server';

import mergeRawSchemas from './util/mergeRawSchemas';

// import graphqlSchemaShards from './schemaShards';

export default mergeRawSchemas(
    {
        typeDefs: [
            gql`
                type Query {
                    _empty: String
                }
                type Mutation {
                    uploadFile(file: Upload!): Boolean!
                }
                type Subscription {
                    _empty: String
                }
            `
        ],
        resolvers: {
            Query: {},
            // TODO: refactor into the shard
            Mutation: {
                uploadFile: async (_, { file }) => {
                    const { filename, createReadStream } = await file;
                    const sourceStream = createReadStream();
                    const destStream = createWriteStream(filename);
                    sourceStream.pipe(destStream);
                    return true;
                }
            }
        }
    },
    // graphqlSchemaShards
);
