const jwt = require("jsonwebtoken");

const generateToken = (user, res, next) => {
  /* const expirationTime = Math.floor(Date.now() / 1000) + 15 * 60;*/ // 15 minutos

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  res.cookie("token", token, { httpOnly: true });
  next(); // Para evitar que el token sea accesible desde el lado del cliente mediante JavaScript
};

const verifyToken = (req, res, next) => {
  console.log("validate token");
  return;
};

const accessWithToken = (req, res, next) => {
  console.log("este es mi token para entrar a mi perfil");
  next();
};

module.exports = {
  generateToken,
  verifyToken,
  accessWithToken,
};
