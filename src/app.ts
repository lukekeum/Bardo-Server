import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';

const app = express();

app.use(bodyParser.json());

const apollo = new ApolloServer({
  schema,
  context: async ({ req, res }) => ({ req, res }),
});

apollo.applyMiddleware({ app });

app.use('/graphql', bodyParser.json(), (req, _, next) => {
  return next();
});

export default app;
