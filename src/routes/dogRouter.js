const { Router } = require('express');
const { getDogs, getDogById, postDog, deleteDog, updateDog, searchBreed } = require('../controllers/dogController.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const dogRouter = Router();

// Configurar los routers

dogRouter.get('/', getDogs);
dogRouter.get('/:id', getDogById);
dogRouter.get('/', searchBreed);
dogRouter.post('/', postDog);
dogRouter.delete('/:id', deleteDog);
dogRouter.put('/:id', updateDog);

module.exports = dogRouter;
