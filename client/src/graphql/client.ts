import type { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient } from "@apollo/client";

import { createUploadLink } from 'apollo-upload-client';

import graphql from "config/graphql";
import cache from "./cache";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: createUploadLink({
        uri: graphql.URL
    })
});

export default client;
