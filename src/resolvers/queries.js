const { authenticator } = require('otplib');

module.exports = {
  Query: {
    generateMultiFactorAuth: (_, { input }) => {
      const appName = input.appName.trim();
      const accountName = input.accountName.trim();
      const secretKey = authenticator.generateSecret();
      const keyUri = authenticator.keyuri(accountName, appName, secretKey);

      const qrCodeUrlParams = new URLSearchParams({
        cht: 'qr',
        chs: '300',
        chl: keyUri,
      });

      const qrCodeUrl = `https://chart.googleapis.com/chart?${qrCodeUrlParams}`;

      return {
        secretKey,
        qrCodeUrl,
      };
    },
  },
};
