/* -------------------------------- Modulos -------------------------------- */
const express = require("express");
const multert = require("multer");
const routerProducts = express.Router();
const path = require("path");

/* -------------------------------- Middlewares -------------------------------- */
//Subir la ruta y el nombre del archivo
const storage = multert.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});
//para ser uso de mi archivo
const upload = multert({ storage: storage });

/* -------------------------------- Rutas -------------------------------- */
/*
{
    id: automatico
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url al logo o foto del producto)
}

*/
const products = [];

routerProducts.get("/formulario", (req, res) => {
  res.sendFile("form.html", { root: "./form" });
});

routerProducts.get("/", (req, res) => {
  res.status(200).json(products);
});

//devuelve un producto según su id
routerProducts.get("/:id", (req, res) => {
    const { id } = req.params;
    const index = products.findIndex((product) => product.id == id);
  
    if (index != -1) {
      res.status(200).json(products[index]);
    } else {
      res.status(404).json({ msg: "Producto no encontrado" });
    }
});

//agrega un producto y usamos middlewares
routerProducts.post("/guardar", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Archivo no encontrado");
    error.httpStatusCode = 400;
    return next(error);
  }

  let producto = {
    id: products.length + 1,
    title: req.body.title,
    price: req.body.price,
    thumbnail: path.join(__dirname, "../uploads", file.filename),
  };

  //console.log(req.body);
  products.push(producto);

  //mostrar el nuevo producto con el ID asignado
  res.status(200).json({ msg: "Producto agregada", data: products });
});

//agrega un producto
routerProducts.post("/", (req, res) => {
  console.log(req.body);
  products.push(req.body);

  //mostrar el nuevo producto con el ID asignado
  res.status(200).json({ msg: "Producto agregada", data: products });
});

//recibe y actualiza un producto según su id
routerProducts.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const index = products.findIndex((product) => product.id == id);

  if (index != -1) {
    products[index].name = name;
    products[index].price = price;
  }

  res.status(200).json({ msg: "Producto actualizado", data: products[index] });
});

//elimina un producto según su id
routerProducts.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((product) => product.id == id);

  if (index != -1) {
    products.splice(index, 1);
    res.status(200).json({ msg: "Producto eliminado" });
  } else {
    res.status(404).json({ msg: "Producto no encontrado" });
  }
});

module.exports = routerProducts;
