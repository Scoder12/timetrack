import fastify from "fastify";
import { CONFIG } from "./config";

async function main() {
  process.on("unhandledRejection", (e) => {
    console.error("FATAL: Unhandled Rejection:", e);
    process.exit(1);
  });

  const app = fastify();

  app.get("/", (_, reply) => {
    reply.send("Hello world!");
  });

  app.listen(CONFIG.PORT, CONFIG.HOST, (err, addr) => {
    if (err) {
      console.error("Listen error:", err);
      return;
    }
    console.log("Listening on", addr);
  });
}

main();
