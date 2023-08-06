import { describe } from "node:test";
import { getActiveTrials } from "./trialService";

describe("Trial Service tests", () => {
  it("Get trials filtered by country code", () => {
    const trials = getActiveTrials({ countryCode: "fr", sponsor: undefined });
    expect(trials).toMatchInlineSnapshot(`
[
  {
    "canceled": false,
    "country": "FR",
    "end_date": "2025-08-01",
    "name": "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
    "primary_purpose": "treatment",
    "sponsor": "Sanofi",
    "start_date": "2019-01-01",
    "study_type": "interventional",
  },
  {
    "canceled": false,
    "country": "fr",
    "end_date": "2032-09-10",
    "name": "Topical Calcipotriene Treatment for Breast Cancer Immunoprevention",
    "primary_purpose": "treatment",
    "sponsor": "Sanofi",
    "start_date": "2018-03-20",
    "study_type": "interventional",
  },
]
`);
  });

  it("Search by country code should not be case sensitive", () => {
    expect(getActiveTrials({ countryCode: "fr" })).toStrictEqual(
      getActiveTrials({ countryCode: "FR" })
    );
  });

  it("Search by sponsor", () => {
    expect(getActiveTrials({ sponsor: "AstraZeneca" })).toMatchInlineSnapshot(`
[
  {
    "canceled": false,
    "country": "IT",
    "end_date": "2030-12-24",
    "name": "Supine MRI in Breast Cancer Patients Receiving Neoadjuvant Therapy",
    "primary_purpose": "treatment",
    "sponsor": "AstraZeneca",
    "start_date": "2022-06-15",
    "study_type": "interventional",
  },
  {
    "canceled": false,
    "country": "DE",
    "end_date": "2026-10-10",
    "name": "Neratinib +/- Fulvestrant in HER2+, ER+ Metastatic Breast Cancer",
    "primary_purpose": "treatment",
    "sponsor": "AstraZeneca",
    "start_date": "2016-03-08",
    "study_type": "interventional",
  },
]
`);
    expect(getActiveTrials({ sponsor: "Sanofi" })).toMatchInlineSnapshot(`
[
  {
    "canceled": false,
    "country": "FR",
    "end_date": "2025-08-01",
    "name": "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
    "primary_purpose": "treatment",
    "sponsor": "Sanofi",
    "start_date": "2019-01-01",
    "study_type": "interventional",
  },
  {
    "canceled": false,
    "country": "fr",
    "end_date": "2032-09-10",
    "name": "Topical Calcipotriene Treatment for Breast Cancer Immunoprevention",
    "primary_purpose": "treatment",
    "sponsor": "Sanofi",
    "start_date": "2018-03-20",
    "study_type": "interventional",
  },
]
`);
  });
});
