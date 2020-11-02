import { RedisCache } from "apollo-server-cache-redis";

export default (options: IDatasourceCache) => new RedisCache(options);

export interface IDatasourceCache {
    readonly host: string
}
