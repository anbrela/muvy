//Cargar rutas de la API
const dotenv = require("dotenv").config();
const codeRoutes = require("./Routes/Code");
const gameRoutes = require("./Routes/Game");
const roomRoutes = require("./Routes/Room");
const teamRoutes = require("./Routes/Team");
const questionRoutes = require("./Routes/Question");
const fs = require("fs");

//cargar modulos de node
const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");

//SOLO EN EL SERVIDOR
var options = {
  key: fs.readFileSync(
    "/home/escapismolugo/domains/api.escapismolugo.com/ssl.key"
  ),
  cert: fs.readFileSync(
    "/home/escapismolugo/domains/api.escapismolugo.com/ssl.cert"
  ),
};

const app = express();

//SOLO EN EL SERVIDOR
const httpServer = require("https").createServer(options, app);

//const httpServer = require("http").createServer(app);

//SOLO EN EL SERVIDOR
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://app.escapismolugo.com",
    methods: ["GET", "POST"],
  },
})


app.use(cors());

const bodyParser = require("body-parser");

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//añadir prefijos a rutas o cargar rutas
app.use("/api/codes", codeRoutes);



httpServer.listen(4001, () => {
  console.log("listening on *:4001");
});

// Exportar módulo (fichero actual)
module.exports = app;
