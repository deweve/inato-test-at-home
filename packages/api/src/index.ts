import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { TrialResolver } from "./Trials/Resolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const port = 8080;
async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [TrialResolver],
  });

  // Create GraphQL server
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, { listen: { port } });
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
