import type { Config, CorsOptions, Request } from 'apollo-server';
import { ApolloServer } from "apollo-server";

export default (config: Config) => new ApolloServer(config);

export type GQLServerConfig = Config & {
    cors?: boolean | CorsOptions | undefined;
    onHealthCheck?: ((req: Request) => Promise<unknown>) | undefined;
}
