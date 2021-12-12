const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user");
const watchRoutes = require("./routes/watch");
const rateRoutes = require("./routes/rate");
const commentRoutes = require("./routes/comment");
const Roles = require("./models/roles");

//cargar modulos de node
const express = require("express");
const router = express.Router();

//ejecutar express (http) es el servidor.
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS
app.use(cors());

app.use(bodyParser.json());

//two new roles if not exists

const roles = [
  {
    role: "User",
  },
  {
    role: "Admin",
  },
];

roles.map((rol) =>
  Roles.findOne({ role: rol.role }, async (err, existRole) => {
    if (err) {
      console.log(err);
    }
    if (existRole) {
      console.log("Rol inicial ya creado");
    } else {
      const newRole = new Roles({
        role: rol.role,
      });
      const savedRole = await newRole.save();
    }
  })
);

app.use("/api", userRoutes);
app.use("/api", watchRoutes);
app.use("/api", rateRoutes);
app.use("/api", commentRoutes);

// Exportar módulo (fichero actual)
module.exports = app;
