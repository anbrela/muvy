//Imports de mongoose, .env y app.
const dotenv = require("dotenv");

const app = require("./app");
const mongoose = require("mongoose");

const port = 4000;
//Conectar a la DB
mongoose
  .connect(process.env.URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => {
    app.listen(port, () => {
      console.log("Api iniciada en " + port);
    });
  })
  .catch((error) => console.log("no conectado" + error));
