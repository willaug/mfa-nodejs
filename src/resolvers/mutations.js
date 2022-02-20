const { authenticator } = require('otplib');
const { ApolloError } = require('apollo-server');
const axios = require('axios');

const { encrypt, decrypt } = require('../core/crypto');

axios.defaults.baseURL = 'http://localhost:3000/';
axios.interceptors.response.use((res) => res, (err) => err);

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

      if (account.mfaKey) {
        throw new ApolloError('account already has mfa', 'ACCOUNT_ALREADY_HAS_MFA');
      }

      await axios.patch(`accounts/${accountId}`, {
        mfaKey: encrypt(secretKey),
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

      const isValid = authenticator.check(token, decrypt(account.mfaKey));
      if (!isValid) {
        throw new ApolloError('invalid mfa', 'INVALID_MFA');
      }

      return {
        message: 'mfa verified successfully',
      };
    },
  },
};
