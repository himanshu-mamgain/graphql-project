const path = require('path');
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

// Importing schema, rootValue (root resolver)
const { schema, rootValue } = require('./service/graphQL');

const app = express();

app.use(bodyParser.json());

// Set up a route for GraphQL using express-graphql
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true // Enable the GraphiQL UI for testing queries
}));

const port = process.env.port || process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
});