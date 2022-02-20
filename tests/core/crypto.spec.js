const { encrypt, decrypt } = require('../../src/core/crypto');

describe('Crypto', () => {
  it('Should encrypt and decrypt message', () => {
    const message = 'Hello, sur. How can I help you?';
    const encryptedMessage = encrypt(message);
    const [encrypted, iv] = encryptedMessage.split(':');

    expect(typeof encryptedMessage).toBe('string');
    expect(typeof encrypted).toBe('string');
    expect(typeof iv).toBe('string');

    const decryptedMessage = decrypt(encryptedMessage);
    expect(typeof decryptedMessage).toBe('string');
    expect(decryptedMessage).toBe(message);
  });
});
