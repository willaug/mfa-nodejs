const { gql } = require('apollo-server');

module.exports = gql`
  type MultiFactorAuth {
    secretKey: String!
    qrCodeUrl: String!
  }

  type Response {
    message: String!
  }
`;
