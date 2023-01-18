const { Router } = require('express');
const { getDogs, getDogById, postDog, deleteDog, updateDog } = require('../controllers/dogController.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const dogRouter = Router();

// Configurar los routers

dogRouter.get('/', getDogs);
dogRouter.get('/:id', getDogById);
dogRouter.post('/', postDog);
dogRouter.delete('/:id', deleteDog);
dogRouter.put('/:id', updateDog);

module.exports = dogRouter;
