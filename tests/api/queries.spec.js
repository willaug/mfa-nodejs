const app = require('../../src/app');

describe('Queries', () => {
  test('generateMultiFactorAuth should return new secretKey and qrCodeUrl', async () => {
    const response = await app.executeOperation({
      query: `#graphql
          query generateMultiFactorAuth($input: GenerateMultiFactorAuthInput!) {
            generateMultiFactorAuth(input: $input) {
              secretKey
              qrCodeUrl
            }
          }
        `,
      variables: {
        input: {
          appName: 'ExampleCompany',
          accountName: 'William',
        },
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response).toHaveProperty('data');

    expect(response.data.generateMultiFactorAuth).toMatchObject({
      secretKey: expect.any(String),
      qrCodeUrl: expect.any(String),
    });

    expect(response.data.generateMultiFactorAuth.qrCodeUrl).toContain('ExampleCompany', 'William');
  });
});
