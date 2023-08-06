import { Trial } from "../types/Trial";
import { TrialsFilter } from "../types/TrialFilters";
import { buildPredicateFilter, isOngoingTrial } from "./filters";
import data from "./trials.json";

const trials: Trial[] = data as Trial[];

export function getActiveTrials(filter: Partial<TrialsFilter>): Trial[] {
  const filterFunction = buildPredicateFilter(filter);
  const activeTrials = trials.filter(isOngoingTrial);
  return activeTrials.filter(filterFunction);
}
