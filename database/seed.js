const { writeFileSync } = require('fs');

const seed = async () => {
  const accounts = [
    {
      id: 1,
      name: 'William Augusto',
      mfaKey: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const data = JSON.stringify({ accounts }, null, 2);
  console.clear();

  try {
    writeFileSync(`${__dirname}/db.json`, data);
    console.log('[SEED] The seeds has been inserted into the database!');
  } catch (err) {
    console.error({ err });
  }
};

seed();
