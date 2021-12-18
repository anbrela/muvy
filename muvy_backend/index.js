//Imports de mongoose, .env y app.
const dotenv = require("dotenv");

const app = require("./app");
const mongoose = require("mongoose");

const port = 4000;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//Conectar a la DB
mongoose
  .connect(process.env.URL, options)
  .then((db) => {
    app.listen(port, () => {
      console.log("Api iniciada en " + port);
    });
  })
  .catch((error) => console.log("no conectado" + error));
