import { describe } from "node:test";
import {
  findActiveTrialsByCountry,
  findActiveTrialsBySponsor,
} from "./trialService";

describe("Trial Service tests", () => {
  it("Get trials filtered by country code", () => {
    const trials = findActiveTrialsByCountry("fr");
    expect(trials).toHaveLength(2);
  });

  it("Search by country code should not be case sensitive", () => {
    expect(findActiveTrialsByCountry("fr")).toStrictEqual(
      findActiveTrialsByCountry("FR")
    );
  });

  it("Search by sponsor", () => {
    expect(findActiveTrialsBySponsor("AstraZeneca")).toHaveLength(2);
    expect(findActiveTrialsBySponsor("Sanofi")).toHaveLength(2);
  });
});
