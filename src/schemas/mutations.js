const { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    createMultiFactorAuth(input: CreateMultiFactorAuthInput!): Response!
    verifyMultiFactorAuth(input: VerifyMultiFactorAuthInput!): Response!
  }
`;
