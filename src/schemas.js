const { gql } = require('apollo-server');

module.exports = gql`
  type MultiFactorAuth {
    message: String!
  }

  type MultiFactorAuthGenerated {
    secretKey: String!
    qrCodeUrl: String!
  }

  input AddMultiFactorAuthInput {
    secretKey: String!
    token: String!
    accountId: ID!
  }

  input VerifyMultiFactorAuthInput {
    token: String!
    accountId: ID!
  }
  
  input GenerateSecretKeyInput {
    appName: String!
    accountName: String!
  }

  type Query {
    generateMultiFactorAuth(input: GenerateSecretKeyInput!): MultiFactorAuthGenerated!
  }

  type Mutation {
    createMultiFactorAuth(input: AddMultiFactorAuthInput!): MultiFactorAuth!
    verifyMultiFactorAuth(input: VerifyMultiFactorAuthInput!): MultiFactorAuth!
  }
`;
