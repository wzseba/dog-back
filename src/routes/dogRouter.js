const { Router } = require('express');
const { getDogs } = require('../controllers/dogController.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const dogRouter = Router();

// Configurar los routers

dogRouter.get('/', getDogs);


module.exports = dogRouter;
