const { Router } = require("express");
const {
  formLogin,
  registerUser,
  profileUser,
} = require("../controllers/loginController.js");
const {
  validationLogin,
  validationRegister,
} = require("../middlewares/validationAuth.js");
const { accessWithToken } = require("../middlewares/accessToken.js");

const loginRouter = Router();

loginRouter.post("/register", validationRegister, registerUser);
loginRouter.post("/", validationLogin, formLogin);
loginRouter.get("/profile", accessWithToken, profileUser);

module.exports = loginRouter;
