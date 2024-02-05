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

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await User.create({ name, email, password });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const profileUser = async (req, res) => {
  try {
    const id = req.id;
    // console.log(id);
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ msg: "Not Found" });

    const nameCapitalize = user.name[0].toUpperCase() + user.name.slice(1);

    res.json({ msg: `Walcome ${nameCapitalize}!!` });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
};

module.exports = {
  formLogin,
  registerUser,
  profileUser,
  logout,
};
