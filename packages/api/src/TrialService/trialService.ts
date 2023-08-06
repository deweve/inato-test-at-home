import data from "./trials.json";

interface Trial {
  name: string;
  country: string;
  start_date: string;
  end_date: string;
  sponsor: string;
  canceled: boolean;
  study_type: string;
  primary_purpose: string;
}

const trials: Trial[] = data as Trial[];

type Predicate<T> = (_: T) => boolean;

function isOngoingTrial(trial: Trial): boolean {
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

interface TrialsFilter {
  sponsor: string;
  countryCode: string;
}

type PredicateBuilder<T> = {
  [K in keyof T]: (value: T[K]) => Predicate<Trial>;
};

const predicateTrial: PredicateBuilder<TrialsFilter> = {
  sponsor: filterBySponsor,
  countryCode: isInCountry,
};

function buildPredicateFilter(filter: Partial<TrialsFilter>): Predicate<Trial> {
  const predicates: Predicate<Trial>[] = Object.entries(filter).map(
    ([key, predicateBuilder]) => {
      return predicateTrial[key](predicateBuilder);
    }
  );
  return (trial) => predicates.every((predicate) => predicate(trial));
}

export function getActiveTrials(filter: Partial<TrialsFilter>): Trial[] {
  const filterFunction = buildPredicateFilter(filter);
  const activeTrials = trials.filter(isOngoingTrial);
  return activeTrials.filter(filterFunction);
}
