import { Command, Option } from "commander";
import countries from "./countries.json";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generates/sdk";

const countryOption = new Option(
  "-c, --country <country>",
  "filter trials by country"
)
  .choices(countries.map((country) => country.name))
  .makeOptionMandatory(true);

const indexedCountriesByCode: Record<string, string> = countries.reduce(
  (acc, country) => ({
    ...acc,
    [country.code]: country.name,
  }),
  {}
);

function getCountryName(countryCode: string): string {
  return indexedCountriesByCode[countryCode.toUpperCase()];
}

export const trialCommandBuild = (client: GraphQLClient) =>
  new Command("trials")
    .description("get the list of clinical trials")
    .addOption(countryOption)
    .action(async function (options: { country: string }) {
      const sdk = getSdk(client);
      const country = countries.find(
        (country) => country.name === options.country
      );
      if (!country) {
        throw new Error("Country not found, use one in the list");
      }
      const trials = (await sdk.GetTrials({ countryCode: country.code })).data
        .trials;
      for (const trial of trials) {
        console.log(`${trial.name}, ${getCountryName(trial.country)}`);
      }
    });
