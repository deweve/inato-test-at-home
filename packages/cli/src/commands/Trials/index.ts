import { Command, Option } from "commander";
import countries from "./countries.json";
import { getSdkConfigured } from "../..";

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

export const trialsCommand = new Command("trials")
  .description("get the list of clinical trials")
  .addOption(countryOption)
  .action(async function (options: { country: string }) {
    const { url } = trialsCommand.parent.opts();
    const sdk = getSdkConfigured(url);
    const country = countries.find(
      (country) => country.name === options.country
    );
    if (!country) {
      throw new Error("Country not found, use one in the list");
    }
    try {
      const trials = (await sdk.GetTrials({ countryCode: country.code })).data
        .trials;
      for (const trial of trials) {
        console.log(`${trial.name}, ${getCountryName(trial.country)}`);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  });
