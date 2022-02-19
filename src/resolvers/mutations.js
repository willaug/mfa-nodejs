const { authenticator } = require('otplib');
const { ApolloError } = require('apollo-server');
const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:3000/';

module.exports = {
  Mutation: {
    createMultiFactorAuth: async (_, { input }) => {
      const { secretKey, token, accountId } = input;

      const isValid = authenticator.check(token, secretKey);
      if (!isValid) {
        throw new ApolloError('invalid mfa', 'INVALID_MFA');
      }

      const { data: account } = await axios.get(`accounts/${accountId}`);
      if (!account) {
        throw new ApolloError('account not found', 'ACCOUNT_NOT_FOUND');
      }

      await axios.patch(`accounts/${accountId}`, {
        mfaKey: secretKey,
        updatedAt: new Date().toISOString(),
      });

      return {
        message: 'mfa added successfully',
      };
    },
    verifyMultiFactorAuth: async (_, { input }) => {
      const { token, accountId } = input;

      const { data: account } = await axios.get(`accounts/${accountId}`);
      if (!account) {
        throw new ApolloError('account not found', 'ACCOUNT_NOT_FOUND');
      }

      if (!account.mfaKey) {
        throw new ApolloError('mfa not configured', 'MFA_NOT_CONFIGURED');
      }

      const isValid = authenticator.check(token, account.mfaKey);
      if (!isValid) {
        throw new ApolloError('invalid mfa', 'INVALID_MFA');
      }

      return {
        message: 'mfa verified successfully',
      };
    },
  },
};
