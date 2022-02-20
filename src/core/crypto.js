const { randomBytes, createCipheriv, createDecipheriv } = require('crypto');
require('dotenv').config();

const secretBuffer = Buffer.from(process.env.MFA_SECRET_CRYPTO || 'example8abf71e12989f783b460e38c6');
const algorithm = process.env.MFA_CYPHER_ALG || 'aes-256-cbc';

module.exports.encrypt = (value) => {
  const ivBuffer = Buffer.from(randomBytes(16));

  const cipherCreated = createCipheriv(algorithm, secretBuffer, ivBuffer);
  const cipherUpdated = cipherCreated.update(value);
  const encryptedValue = Buffer.concat([cipherUpdated, cipherCreated.final()]);

  return `${encryptedValue.toString('hex')}:${ivBuffer.toString('hex')}`;
};

module.exports.decrypt = (value) => {
  const [encrypted, iv] = value.split(':');
  const ivBuffer = Buffer.from(iv, 'hex');
  const encryptedBuffer = Buffer.from(encrypted, 'hex');

  const decipherCreated = createDecipheriv(algorithm, secretBuffer, ivBuffer);
  const decipherUpdated = decipherCreated.update(encryptedBuffer);
  const decryptedValue = Buffer.concat([decipherUpdated, decipherCreated.final()]);

  return decryptedValue.toString();
};
