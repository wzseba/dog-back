const jwt = require("jsonwebtoken");

const generateToken = (user, res, next) => {
  /* const expirationTime = Math.floor(Date.now() / 1000) + 15 * 60;*/ // 15 minutos

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  res.cookie("token", token, { httpOnly: true });
  next(); // Para evitar que el token sea accesible desde el lado del cliente mediante JavaScript
};

const accessWithToken = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ msg: "Not authorized" });

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    req.id = userId;

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = {
  generateToken,
  accessWithToken,
};
