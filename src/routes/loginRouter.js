const {Router} = require('express');
//hacer controller e importar
const {formLogin, registerUser} = require('../controllers/loginController.js');

const loginRouter = Router();

loginRouter.post('/',formLogin);
loginRouter.post('/user',registerUser);

module.exports = loginRouter;