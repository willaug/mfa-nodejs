const { writeFileSync } = require('fs');

const seed = async () => {
  const accounts = [
    {
      id: 1,
      name: 'William Augusto',
      mfaKey: null,
    },
    {
      id: 2,
      name: 'John Doe',
      mfaKey: null,
    },
    {
      id: 3,
      name: 'John Doe',
      mfaKey: '4f3c052b3127c94477e46d0b3cfa859b22b9b2ca2c1d50bc65f96c0b4eb68699:888719afd94a9c380a0ace8f52b45e4d',
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
