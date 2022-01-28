/* -------------------------------- Modulos -------------------------------- */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const exphbs = require("express-handlebars");

//const routerProducts = express.Router();
const routerProducts = require("./routes/products.routes");
/* -------------------------------- Instancia de Express ------------------------ */
const app = express();

/* -------------------------------- Middlewares -------------------------------- */
//app.use(express.static("public"));

routerProducts.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* -------------------------------- Motor de plantillas -------------------------------- */
app.set('views', path.join(__dirname, 'views'));
//Config extra para lo que es HBS
app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: 'hbs'
}));
//------------------------------------
app.set('view engine', '');

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

app.get("/", (req, res) => {
  // res.render("formProduct.hbs");
  // res.render("formProduct.pug");
  res.render('pages/form.ejs');
});
