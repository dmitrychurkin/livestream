import type { FastifyServerOptions } from 'fastify';
import fastify from 'fastify';
import io from 'socket.io';
// import cors from 'fastify-cors';
import helmet from 'fastify-helmet';

import gqlServer, { GQLServerConfig } from './graphql';
import gqlSchema from './graphql/schema';

import ioHandler from './connection/io';
import applyController from './controller';

import env from './config/env';

const isDev = env.NODE_ENV === 'development';

export const graphqlApp = async (gqlServerOptions: GQLServerConfig = {}) => {
  const server = gqlServer({
    ...gqlSchema,
    cors: true,
    ...gqlServerOptions
  });

  try {
    if (env.NODE_ENV !== 'test') {
      const { url } = await server
        .listen({ port: env.PORT || 4000 });

      console.log(`🚀 app running at ${url}`)
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export const app = async (fastifyserverOptions: FastifyServerOptions = {}, ioOptions: io.ServerOptions = {}) => {
  const instance = fastify({
    logger: isDev,
    ...fastifyserverOptions
  });

  const ws = io(instance.server, {
    perMessageDeflate: false,
    ...ioOptions
  });

  try {

    ioHandler(ws);

    applyController(instance);

    await instance
       // .register(cors, {  })
      .register(helmet)
      .listen(env.PORT || 3000, '::');

  } catch (err) {
    instance.log.error(err);
    process.exit(1);
  }
};
