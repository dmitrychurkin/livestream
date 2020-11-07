import React, { memo } from 'react';
import { ApolloProvider } from '@apollo/client';

import Layout from 'component/Layout';
import Connection from 'context/Connection';

import graphqlClient from '../../graphql';


const App = () => (
  <ApolloProvider client={graphqlClient}>
    <Connection>
      <Layout />
    </Connection>
  </ApolloProvider>
);

export default memo(App);
