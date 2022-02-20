const { mergeTypeDefs } = require('@graphql-tools/merge');

const types = require('./types');
const inputs = require('./inputs');
const queries = require('./queries');
const mutations = require('./mutations');

module.exports = mergeTypeDefs([types, inputs, queries, mutations]);
