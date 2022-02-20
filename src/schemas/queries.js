const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    generateMultiFactorAuth(input: GenerateMultiFactorAuthInput!): MultiFactorAuth!
  }
`;
