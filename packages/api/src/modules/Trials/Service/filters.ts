import { Trial } from "../types/Trial";
import { TrialsFilter } from "../types/TrialFilters";

type Predicate<T> = (_: T) => boolean;

type PredicateBuilder<T> = {
  [K in keyof T]: (value: T[K]) => Predicate<Trial>;
};

export function isOngoingTrial(trial: Trial): boolean {
  const now = new Date();
  const start_date = new Date(trial.start_date);
  const end_date = new Date(trial.end_date);
  return (
    !trial.canceled &&
    start_date.getTime() <= now.getTime() &&
    end_date.getTime() >= now.getTime()
  );
}

function isInCountry(countryCode: string): Predicate<Trial> {
  const countryCodeLower = countryCode.toLowerCase();
  return (trial) => {
    return trial.country.toLowerCase() === countryCodeLower;
  };
}

function filterBySponsor(sponsor: string): Predicate<Trial> {
  return (trial) => {
    return trial.sponsor === sponsor;
  };
}

const predicateTrial: PredicateBuilder<TrialsFilter> = {
  sponsor: filterBySponsor,
  countryCode: isInCountry,
};

export function buildPredicateFilter(
  filter: Partial<TrialsFilter>
): Predicate<Trial> {
  const predicates: Predicate<Trial>[] = Object.entries(filter)
    .filter(([_, filterValue]) => !!filterValue)
    .map(([key, filterValue]) => {
      return predicateTrial[key](filterValue);
    });
  return (trial) => predicates.every((predicate) => predicate(trial));
}
