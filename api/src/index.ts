import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { CONFIG } from "./config";
import { __PROD__ } from "./constants";
import { HelloResolver } from "./resolvers/hello";

function getMetadata(): { name: string; version: string } {
  const data = (require("../package.json") as any) || {};
  return { name: data.name || "Unknown", version: data.version || "0.0.0" };
}

async function main() {
  process.on("unhandledRejection", (e) => {
    console.error("FATAL: Unhandled Rejection:", e);
    process.exit(1);
  });

  const { name, version } = getMetadata();
  console.log(
    `Starting ${name} v${version} in ${
      __PROD__ ? "production" : "development"
    } mode`
  );

  const app = express();

  const schema = await buildSchema({
    resolvers: [HelloResolver],
    validate: false,
  });

  const server = new ApolloServer({ schema, tracing: !__PROD__ });
  server.applyMiddleware({ app });

  app.get("/", (_, reply) => {
    reply.send("Hello world!");
  });

  app.listen(Number(CONFIG.PORT), CONFIG.HOST, () => {
    console.log(`Listening on http://${CONFIG.HOST}:${CONFIG.PORT}`);
  });
}

main();
