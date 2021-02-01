import dotenv from "dotenv";
import fastify from "fastify";
import Next from "next";

import apolloServerInstance from "../apollo/server";

dotenv.config();

const { NODE_ENV, PORT = "3000" } = process.env;

const isDev = NODE_ENV !== "production";

const app = fastify({ logger: isDev });

app
  .register(apolloServerInstance.createHandler())
  .register((fastify, _, next) => {
    const app = Next({ dev: isDev });
    const handle = app.getRequestHandler();
    app
      .prepare()
      .then(() => {
        if (isDev) {
          fastify.get("/_next/*", (req, reply) =>
            handle(req.raw, (<any>reply).res).then(() => {
              reply.sent = true;
            })
          );
        }

        fastify
          .all("/*", (req, reply) =>
            handle(req.raw, (<any>reply).res).then(() => {
              reply.sent = true;
            })
          )
          .setNotFoundHandler((request, reply) =>
            app.render404(request.raw, (<any>reply).res).then(() => {
              reply.sent = true;
            })
          );
        next();
      })
      .catch(next);
  })
  .listen(parseInt(PORT, 10))
  .catch((_) => process.exit(1));
