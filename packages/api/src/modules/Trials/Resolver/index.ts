import { Trial } from "../types/Trial";

import { getActiveTrials } from "../Service/trialService";
import { TrialsFilter } from "../types/TrialFilters";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver(Trial)
export class TrialResolver {
  @Query(() => [Trial])
  trials(@Arg("filter") filter: TrialsFilter) {
    return getActiveTrials(filter);
  }
}
