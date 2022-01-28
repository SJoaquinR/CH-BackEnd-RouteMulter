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
// https://www.iconfinder.com/free_icons
const products = [];

routerProducts.get("/productos", (req, res) => {
   console.log(products);
  // res.render('listProducts.hbs', {products: products});
 //res.render('listProducts.pug', {products: products});
res.render('pages/products.ejs', {products: products});
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
routerProducts.post("/productos", (req, res) => {
  const { title, price, image } = req.body;
  
  let producto = {
    id: products.length + 1,
    title: title,
    price: price,
    image: image,
  };
 
  products.push(producto);
  res.redirect("/");
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


//agrega un producto por postman
routerProducts.post("/test", (req, res) => {
  console.log(req.body);
  products.push(req.body);

  //mostrar el nuevo producto con el ID asignado
  res.status(200).json({ msg: "Producto agregada", data: products });
});

module.exports = routerProducts;
