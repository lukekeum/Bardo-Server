import { gql, IResolvers, makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';

const typeDef = gql`
  scalar Date
  type Query {
    _version: String
  }
  type Mutation {
    _empty: String
  }
`;

const resolvers: IResolvers = {
  Query: {
    _version: () => '0.1',
  },
  Mutation: {},
};

const schema = makeExecutableSchema({
  typeDefs: [typeDef],
  resolvers: merge(resolvers),
});

export default schema;
