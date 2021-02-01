import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import { useApollo } from "../apollo/client";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
