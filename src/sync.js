const { conn } = require('./db.js');

// Importa todos tus modelos aquí para que conn los conozca
require('./models/Dog.js');
require('./models/Temperament.js');
require('./models/User.js')

conn.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully! Tables are ready.');
    process.exit(0); // Cierra el proceso si tiene éxito
  })
  .catch(error => {
    console.error('Failed to sync database:', error);
    process.exit(1); // Sale con error
  });