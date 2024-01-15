// import server from './src/app'
// import connection from './src/db';

// const { PORT } = process.env;
// const port = Number(PORT);

// //Syncing all the models at once
// connection.connect.sync({ force: false }).then(() => {
//   server.listen(port, () => {
//     console.log(`server listening on port ${PORT}`);
//   });
// });

import server from './src/app';
const { conn } = require("./src/db");

const { PORT } = process.env;
const port = Number(PORT);

// Syncing all the models at once.

conn.sync({ force: false }).then(() => { 
  server.listen(PORT, () => {
    console.log(`listening to ${PORT}`); // eslint-disable-line no-console
  });
});