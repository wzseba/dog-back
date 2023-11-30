const { User } = require("../db"); //en proceso de desarrollo

const formLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }
    console.log('usuario--> ',user);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    console.log('password--> ',passwordMatch);
    const token = jwt.sign({ userId: user.id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });

  } catch (error) {
    next(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  formLogin,
};
