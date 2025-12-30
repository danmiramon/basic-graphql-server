import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";
const dirname = import.meta.dirname;

const typeDefs = mergeTypeDefs([
  ...loadFilesSync(path.join(dirname,
    "../features/**/*.graphql"
  ))
]);

const resolvers = mergeResolvers([
  ...loadFilesSync(path.join(dirname,
    "../resolvers/**/*.resolvers.ts"
  ))
]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;