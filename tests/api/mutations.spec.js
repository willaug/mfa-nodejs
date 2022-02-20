const { authenticator } = require('otplib');
const app = require('../../src/app');

describe('Mutations', () => {
  describe('success', () => {
    test('createMultiFactorAuth should add secretKey in account and return message successfully', async () => {
      const response = await app.executeOperation({
        query: `#graphql
            mutation createMultiFactorAuth($input: CreateMultiFactorAuthInput!) {
              createMultiFactorAuth(input: $input) {
                message
              }
            }
          `,
        variables: {
          input: {
            secretKey: 'GBPWGDDVNNAGCEYC',
            accountId: 2,
            token: authenticator.generate('GBPWGDDVNNAGCEYC'),
          },
        },
      });

      expect(response.errors).toBeUndefined();
      expect(response).toHaveProperty('data');
      expect(response.data.createMultiFactorAuth).toMatchObject({
        message: 'mfa added successfully',
      });
    });

    test('verifyMultiFactorAuth should return message successfully', async () => {
      const response = await app.executeOperation({
        query: `#graphql
            mutation verifyMultiFactorAuth($input: VerifyMultiFactorAuthInput!) {
              verifyMultiFactorAuth(input: $input) {
                message
              }
            }
          `,
        variables: {
          input: {
            accountId: 3,
            token: authenticator.generate('GBPWGDDVNNAGCEYC'),
          },
        },
      });

      expect(response.errors).toBeUndefined();
      expect(response).toHaveProperty('data');
      expect(response.data.verifyMultiFactorAuth).toMatchObject({
        message: 'mfa verified successfully',
      });
    });
  });

  describe('err', () => {
    test('createMultiFactorAuth should return token invalid err', async () => {
      const response = await app.executeOperation({
        query: `#graphql
            mutation createMultiFactorAuth($input: CreateMultiFactorAuthInput!) {
              createMultiFactorAuth(input: $input) {
                message
              }
            }
          `,
        variables: {
          input: {
            secretKey: 'GBPWGDDVNNAGCEYC',
            accountId: 2,
            token: '404404',
          },
        },
      });

      expect(response).toHaveProperty('errors');

      const [error] = response.errors;
      expect(error.message).toEqual('invalid mfa');
      expect(error.extensions.code).toEqual('INVALID_MFA');
    });

    test('verifyMultiFactorAuth should return token invalid err', async () => {
      const response = await app.executeOperation({
        query: `#graphql
            mutation verifyMultiFactorAuth($input: VerifyMultiFactorAuthInput!) {
              verifyMultiFactorAuth(input: $input) {
                message
              }
            }
          `,
        variables: {
          input: {
            accountId: 2,
            token: '404404',
          },
        },
      });

      expect(response).toHaveProperty('errors');

      const [error] = response.errors;
      expect(error.message).toEqual('invalid mfa');
      expect(error.extensions.code).toEqual('INVALID_MFA');
    });

    test('createMultiFactorAuth should return account not found err', async () => {
      const response = await app.executeOperation({
        query: `#graphql
            mutation createMultiFactorAuth($input: CreateMultiFactorAuthInput!) {
              createMultiFactorAuth(input: $input) {
                message
              }
            }
          `,
        variables: {
          input: {
            secretKey: 'GBPWGDDVNNAGCEYC',
            accountId: 100,
            token: authenticator.generate('GBPWGDDVNNAGCEYC'),
          },
        },
      });

      expect(response).toHaveProperty('errors');

      const [error] = response.errors;
      expect(error.message).toEqual('account not found');
      expect(error.extensions.code).toEqual('ACCOUNT_NOT_FOUND');
    });

    test('verifyMultiFactorAuth should return account not found err', async () => {
      const response = await app.executeOperation({
        query: `#graphql
            mutation verifyMultiFactorAuth($input: VerifyMultiFactorAuthInput!) {
              verifyMultiFactorAuth(input: $input) {
                message
              }
            }
          `,
        variables: {
          input: {
            accountId: 100,
            token: '123456',
          },
        },
      });

      expect(response).toHaveProperty('errors');

      const [error] = response.errors;
      expect(error.message).toEqual('account not found');
      expect(error.extensions.code).toEqual('ACCOUNT_NOT_FOUND');
    });

    test('createMultiFactorAuth should return account has mfa err', async () => {
      const response = await app.executeOperation({
        query: `#graphql
            mutation createMultiFactorAuth($input: CreateMultiFactorAuthInput!) {
              createMultiFactorAuth(input: $input) {
                message
              }
            }
          `,
        variables: {
          input: {
            secretKey: 'GBPWGDDVNNAGCEYC',
            accountId: 3,
            token: authenticator.generate('GBPWGDDVNNAGCEYC'),
          },
        },
      });

      expect(response).toHaveProperty('errors');

      const [error] = response.errors;
      expect(error.message).toEqual('account already has mfa');
      expect(error.extensions.code).toEqual('ACCOUNT_ALREADY_HAS_MFA');
    });

    test('verifyMultiFactorAuth should return account hasn\'t mfa err', async () => {
      const response = await app.executeOperation({
        query: `#graphql
            mutation verifyMultiFactorAuth($input: VerifyMultiFactorAuthInput!) {
              verifyMultiFactorAuth(input: $input) {
                message
              }
            }
          `,
        variables: {
          input: {
            accountId: 1,
            token: '123456',
          },
        },
      });

      expect(response).toHaveProperty('errors');

      const [error] = response.errors;
      expect(error.message).toEqual('mfa not configured');
      expect(error.extensions.code).toEqual('MFA_NOT_CONFIGURED');
    });
  });
});
