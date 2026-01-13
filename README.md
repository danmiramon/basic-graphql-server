# Basic Graphql Server
This is a basic setup for a GraphQL Server.
However, with basic I don't mean barebones, I mean that it contains the elements for it to run with the initial features used in the industry which can be enabled or disabled depending on the necessities.
- An Express.js server instead of an Apollo Standalone server, which allows for flexibility and more poweful features.
- Apollo Server which allows for easy configuration and handleing of GraphQL.
- Websockets setup for real time communication between the client and the server.
- Rate limiter to prevent user's excessive calls overtime or malicious attacks, left a note in server.ts to disable this feature for development testing.
- Prisma local database, for local development, it can be easily switched to an external database like MongoDB or Postgres with minimum changes.

### Local Installation
- Create a `.env` file in the root directory and define the `DATABASE_URL` and `PORT` where the application should be served, or just use the default values provided.
- Run the command, this will install the dependencies, setup the local database and seed it with some records.
```sh
npm run init
```
- Visit the provided URL, if using the default values it will be served at
```sh
http://localhost:4000/graphql
```
- It will open an Apollo Sandbox where you can start experimenting with GraphQL queries.
