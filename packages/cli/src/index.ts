import { program } from "commander";
import { GraphQLClient } from "graphql-request";
import { trialCommandBuild } from "./commands/trials";

const client = new GraphQLClient("http://localhost:8080/graphql");

program
  .name("inato-cli")
  .addCommand(trialCommandBuild(client))
  .parseAsync(process.argv);
