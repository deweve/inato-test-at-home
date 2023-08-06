import { Option, Command } from "commander";
import { GraphQLClient } from "graphql-request";
import { trialsCommand } from "./commands/Trials";
import { Sdk, getSdk } from "./generates/sdk";

const option = new Option("--url <url>", "Inato api url").default(
  "http://localhost:8080/graphql"
);

export function getSdkConfigured(apiUrl: string): Sdk {
  const client = new GraphQLClient(apiUrl);
  return getSdk(client);
}

const command = new Command("inato-cli")
  .addCommand(trialsCommand)
  .addOption(option);

command.parseAsync();
