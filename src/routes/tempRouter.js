const { Router } = require('express');
const { getTemperaments } = require('../controllers/tempController');


const tempRouter = Router();

tempRouter.get('/', getTemperaments);



module.exports = tempRouter;