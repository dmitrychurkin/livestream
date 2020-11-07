import type { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient } from "@apollo/client";

import cache from "./cache";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache
});

export default client;
