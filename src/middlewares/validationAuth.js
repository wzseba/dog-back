const { check, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

const validationLogin = [
  check("email", "Email no valido")
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail()
    .toLowerCase(),
  check("password", "Password incorrecto")
    .trim()
    .escape()
    .notEmpty()
    .isAlphanumeric()
    .isLength({ min: 6, max: 10 }),
  validateResult,
];

const validationRegister = [
  check("name", "Formato no valido")
    .trim()
    .escape()
    .notEmpty()
    .toLowerCase()
    .isAlpha()
    .withMessage("Solo se admiten letras")
    .isLength({ min: 4, max: 15 })
    .withMessage("Debe de tener minimo 4 caracteres y maximo 15"),
  check("email", "Email no valido")
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail()
    .toLowerCase(),
  check("password", "Password incorrecto")
    .trim()
    .escape()
    .notEmpty()
    .isAlphanumeric()
    .isLength({ min: 6, max: 10 })
    .withMessage("Debe de tener minimo 6 caracteres y maximo 10"),
  validateResult,
];

module.exports = { validationLogin, validationRegister };
