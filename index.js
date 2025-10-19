const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = process.env.PORT ?? 3001;

//force: false guarda la base de datos
//force: true elimina la base de datos
conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
module.exports = server;