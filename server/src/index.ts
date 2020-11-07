import env from './config/env';
import AppType from './const/AppType';
import { app, graphqlApp } from './app';

switch (env.APP_TYPE) {
  case AppType.GQL: {
    graphqlApp();
    break;
  }
  default:
    app();
}
