const { User } = require("../db"); //en proceso de desarrollo
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const formLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalido password" });
    }

    const token = jwt.sign({ userId: user.id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.cookie("token", token);
    return res.send("inicio de sesion correcto!!");
  } catch (error) {
    next(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const registerUser = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(name + "---" + email + "---" + password);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  formLogin,
  registerUser
};
