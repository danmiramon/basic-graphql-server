import express from "express";
import cors from "cors";
// import { WebSocketServer } from "ws";
import { createServer } from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
// import { useServer } from "graphql-ws/use/ws";
// import { execute, subscribe } from "graphql";
import schema from "./schema/index.ts";

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({ schema });
  await apolloServer.start();
  // apolloServer.applyMiddleware({ app });

  app.use(
    cors(),
    express.json(),
    expressMiddleware(apolloServer)
  );

  const httpServer = createServer(app);

  // SubscriptionServer.create(
  //   {
  //     schema,
  //     execute,
  //     subscribe
  //   },
  //   {
  //     server: httpServer,
  //     path: apolloServer.graphqlPath
  //   }
  // );

  httpServer.listen(4000, () => {
    console.log("HTTP listening at http://localhost:4000/graphql");
    console.log("Websockets listening at ws://localhost:4000/graphql");
  });
}

startServer();