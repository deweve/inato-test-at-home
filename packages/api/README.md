# API

This package is the beginning of an API built using [ApolloServer](https://www.apollographql.com/docs/apollo-server) and [TypeGraphql](https://typegraphql.com/)

You can run it using the following command:

```sh
yarn start
```

The server is available at url : `http://localhost:8080/graphql`

# Tests

To run tests use the following command:

```sh
yarn test
```

# Architecture

Choose to do an GraphqlAPI because it provides powerful codegen tools to request the api and let the client decide what to receive.

Each module directory should be organize this way:

- Service folder to access the data
- Types folder for every types
- Resolver folder to expose the data to the api.

There is for now only the [Trial module](./src/Trials/README.md), with its service to expose trials and its resolver
