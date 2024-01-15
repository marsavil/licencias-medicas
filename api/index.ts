
import server from './src/app';
const { conn } = require("./src/db");

const { PORT } = process.env;
const port = Number(PORT);

// Syncing all the models.

conn.sync({ force: false }).then(() => { 
  server.listen(PORT, () => {
    console.log(`listening to ${PORT}`); // eslint-disable-line no-console
  });
});