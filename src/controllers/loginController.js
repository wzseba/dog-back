const { User } = require("../db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/accessToken.js");

const formLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "El usuario no existe" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "El password es incorrecto" });
    }
    generateToken(user, res, next);
    // console.log(user.id);
    res.json({ ok: true });
  } catch (error) {
    next(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    await User.create({ name, email, password });

    res.status(200).json({ message: "Usuario creado!!" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const profileUser = (req, res, next) => {
  console.log("perfil de usuario con token");
  return;
};

module.exports = {
  formLogin,
  registerUser,
  profileUser,
};
