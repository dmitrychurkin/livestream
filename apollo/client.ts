import axios, { AxiosTransformer } from "axios";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { buildAxiosFetch } from "@lifeomic/axios-fetch";
import { useMemo } from "react";
import merge from "deepmerge";

const axiosTransformer = (config: any, _: any, init: any) => ({
  ...config,
  onUploadProgress: init.onUploadProgress,
});
const customFetch: any = buildAxiosFetch(
  axios,
  axiosTransformer as AxiosTransformer
);

let apolloClient: ApolloClient<NormalizedCacheObject>;

export const initializeApollo = (
  initialState = {}
): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") {
    return _apolloClient;
  }
  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
};

export const useApollo = (
  initialState = {}
): ApolloClient<NormalizedCacheObject> =>
  useMemo(() => initializeApollo(initialState), [initialState]);

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createUploadLink({
      fetch: customFetch,
    }),
    cache: new InMemoryCache(),
  });
}
