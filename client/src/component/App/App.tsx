import Layout from 'component/Layout';
import Connection from 'context/Connection';
import React, { memo } from 'react';

const App = () => (
  <Connection>
    <Layout />
  </Connection>
);

export default memo(App);
