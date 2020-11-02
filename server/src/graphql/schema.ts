
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
                    _empty: String
                }
                type Subscription {
                    _empty: String
                }
            `
        ],
        resolvers: {
            Query: {}
        }
    },
    // graphqlSchemaShards
);
