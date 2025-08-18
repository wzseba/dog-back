require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dogRouter = require("./routes/dogRouter.js");
const tempRouter = require("./routes/tempRouter.js");
const loginRouter = require("./routes/loginRouter.js");
const cors = require("cors"); // 👈 te falta esta línea

require("./db.js");

const server = express();

server.use(cors({
  origin: "https://doglandia.vercel.app", // dominio del frontend
  credentials: true                       // permite cookies / headers de autenticación
}));

server.name = "API";
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));
// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   next();
// });

server.use("/auth", loginRouter);
server.use("/dogs", dogRouter);
server.use("/temperaments", tempRouter);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
