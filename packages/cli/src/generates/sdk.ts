import { GraphQLClient } from "graphql-request";
import { GraphQLClientRequestHeaders } from "graphql-request/build/cjs/types";
import { print } from "graphql";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Query = {
  __typename?: "Query";
  trials: Array<Trial>;
};

export type QueryTrialsArgs = {
  filter: TrialsFilter;
};

export type Trial = {
  __typename?: "Trial";
  canceled: Scalars["Boolean"]["output"];
  country: Scalars["String"]["output"];
  end_date: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  primary_purpose: Scalars["String"]["output"];
  sponsor: Scalars["String"]["output"];
  start_date: Scalars["String"]["output"];
  study_type: Scalars["String"]["output"];
};

export type TrialsFilter = {
  countryCode?: InputMaybe<Scalars["String"]["input"]>;
  sponsor?: InputMaybe<Scalars["String"]["input"]>;
};

export type TrialsQueryVariables = Exact<{
  countryCode: Scalars["String"]["input"];
}>;

export type TrialsQuery = {
  __typename?: "Query";
  trials: Array<{ __typename?: "Trial"; name: string; country: string }>;
};

export const TrialsDocument = gql`
  query trials($countryCode: String!) {
    trials(filter: { countryCode: $countryCode }) {
      name
      country
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action();
const TrialsDocumentString = print(TrialsDocument);
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    trials(
      variables: TrialsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<{
      data: TrialsQuery;
      extensions?: any;
      headers: Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<TrialsQuery>(TrialsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "trials",
        "query"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
