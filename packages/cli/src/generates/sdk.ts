import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  trials: Array<Trial>;
};


export type QueryTrialsArgs = {
  filter: TrialsFilter;
};

export type Trial = {
  __typename?: 'Trial';
  canceled: Scalars['Boolean']['output'];
  country: Scalars['String']['output'];
  end_date: Scalars['String']['output'];
  name: Scalars['String']['output'];
  primary_purpose: Scalars['String']['output'];
  sponsor: Scalars['String']['output'];
  start_date: Scalars['String']['output'];
  study_type: Scalars['String']['output'];
};

export type TrialsFilter = {
  countryCode?: InputMaybe<Scalars['String']['input']>;
  sponsor?: InputMaybe<Scalars['String']['input']>;
};

export type GetTrialsQueryVariables = Exact<{
  countryCode: Scalars['String']['input'];
}>;


export type GetTrialsQuery = { __typename?: 'Query', trials: Array<{ __typename?: 'Trial', name: string, country: string }> };


export const GetTrialsDocument = gql`
    query GetTrials($countryCode: String!) {
  trials(filter: {countryCode: $countryCode}) {
    name
    country
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GetTrialsDocumentString = print(GetTrialsDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetTrials(variables: GetTrialsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: GetTrialsQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetTrialsQuery>(GetTrialsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTrials', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;