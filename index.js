//const server = require('./src/app.js');
//const { conn } = require('./src/db.js');
//const PORT = process.env.PORT ?? 3001;

//force: false guarda la base de datos
//force: true elimina la base de datos
/*conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});*/
// src/sync.js
const { conn } = require('./db.js');

// Importa todos tus modelos aquí para que conn los conozca
require('./src/models/User.js');
require('./src/models/Temperament.js');
require('./src/models/Dog.js')

conn.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully! Tables are ready.');
    process.exit(0); // Cierra el proceso si tiene éxito
  })
  .catch(error => {
    console.error('Failed to sync database:', error);
    process.exit(1); // Sale con error
  });
//module.exports = server;