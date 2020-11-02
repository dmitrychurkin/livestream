import type { FastifyInstance } from "fastify";
import ws from "./ws";

export default (app: FastifyInstance) => {
  [
    ws
  ].forEach(fn => fn(app));
};