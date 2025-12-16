const { studentsResolver } = require('./resolvers/students.resolver');
const { readFileSync } = require('fs');
const path = require('path');

// Load the schema from the .graphql file
const studentTypes = readFileSync(
  path.join(__dirname, './typeDefs/students.graphql'),
  'utf8'
);
const typeDefs = `
  ${studentTypes}
`;

// Resolvers

const resolvers = {
  Query: {
    ...studentsResolver.Query,
    },
  };

  module.exports = {
    typeDefs,
    resolvers,
  };