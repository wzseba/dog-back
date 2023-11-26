const {Router} = require('express');
//hacer controller e importar

const loginRouter = Router();

loginRouter.get('/login',formLogin);

module.exports = loginRouter;