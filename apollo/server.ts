import { ApolloServer } from "apollo-server-fastify";
import schema from "./schema";

export default new ApolloServer({ ...schema });
