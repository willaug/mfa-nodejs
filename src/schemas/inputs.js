const { gql } = require('apollo-server');

module.exports = gql`
  input CreateMultiFactorAuthInput {
    secretKey: String!
    token: String!
    accountId: ID!
  }

  input VerifyMultiFactorAuthInput {
    token: String!
    accountId: ID!
  }
  
  input GenerateMultiFactorAuthInput {
    appName: String!
    accountName: String!
  }
`;
