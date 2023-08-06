# Access trials

You must access trials only with the function getActiveTrials.

# How to create a new filter

All the filters are in the filter.ts file.

To create a new one you must add the filter argument in the [TrialFilter class](./types/TrialFilters.ts).

Then create a function that take the parameter value and return a predicate like this example:

```typescript
function isInCountry(countryCode: string): Predicate<Trial> {
  const countryCodeLower = countryCode.toLowerCase();
  return (trial) => {
    return trial.country.toLowerCase() === countryCodeLower;
  };
}
```

Then add the function in the predicateTrial object

The function buildPredicateFilter will build a predicate function to filter trials according to the filter given.
