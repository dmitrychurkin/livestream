"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const fastify_1 = tslib_1.__importDefault(require("fastify"));
const next_1 = tslib_1.__importDefault(require("next"));
const server_1 = tslib_1.__importDefault(require("../apollo/server"));
dotenv_1.default.config();
const { NODE_ENV, PORT = "3000" } = process.env;
const isDev = NODE_ENV !== "production";
const app = fastify_1.default({ logger: isDev });
app
    .register(server_1.default.createHandler())
    .register((fastify, _, next) => {
    const app = next_1.default({ dev: isDev });
    const handle = app.getRequestHandler();
    app
        .prepare()
        .then(() => {
        if (isDev) {
            fastify.get("/_next/*", (req, reply) => handle(req.raw, reply.res).then(() => {
                reply.sent = true;
            }));
        }
        fastify
            .all("/*", (req, reply) => handle(req.raw, reply.res).then(() => {
            reply.sent = true;
        }))
            .setNotFoundHandler((request, reply) => app.render404(request.raw, reply.res).then(() => {
            reply.sent = true;
        }));
        next();
    })
        .catch(next);
})
    .listen(parseInt(PORT, 10))
    .catch((_) => process.exit(1));
