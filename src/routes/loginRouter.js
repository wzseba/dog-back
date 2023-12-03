const {Router} = require('express');
//hacer controller e importar
const {formLogin} = require('../controllers/loginController.js');

const loginRouter = Router();

loginRouter.post('/',formLogin);

module.exports = loginRouter;