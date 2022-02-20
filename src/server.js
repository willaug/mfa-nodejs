const app = require('./app');

app.listen().then(({ url }) => {
  console.log(`🚀 API ready at ${url}`);
});
