/* -------------------------------- Modulos -------------------------------- */
const express = require("express");
const bodyParser = require("body-parser");

//const routerProducts = express.Router();
const routerProducts = require("./routes/products.routes");
/* -------------------------------- Instancia de Express -------------------------------- */
const app = express();

/* -------------------------------- Middlewares -------------------------------- */
app.use(express.static("public"));

routerProducts.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



/* -------------------------------- Server -------------------------------- */
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (err) => {
  console.log(`Error en el servidor: ${err}`);
});

/* -------------------------------- Rutas -------------------------------- */
/* Agregamos routers a la app */
app.use("/api/productos", routerProducts);
