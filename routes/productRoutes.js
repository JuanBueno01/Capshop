console.log(" Cargando productRoutes.js");

const express = require("express");
const router = express.Router();

// Usa tu modelo de MySQL, NO mongoose
const productModel = require("../models/productModel");

// ==========================================
// 🛒 AGREGAR PRODUCTO AL CARRITO
// ==========================================
router.post("/add-to-cart/:id", (req, res) => {
  const id = req.params.id;
  console.log("Agregando producto al carrito:", id);

  productModel.obtenerProductoPorId(id, (err, resultado) => {
    if (err || resultado.length === 0) {
      console.log("Error obteniendo producto:", err);
      return res.redirect("/menu");
    }

    const product = resultado[0];

    const cart = req.session.cart;

    // Ver si ya existe
    let exists = cart.find(item => item.id == id);

    if (exists) {
      exists.quantity++;
    } else {
      cart.push({
        id: product.id_producto,
        name: product.nombre,
        price: product.precio,
        image: `/img/${product.imagen}`,
        quantity: 1
      });
    }

    return res.redirect("/carrito");
  });
});



//  AUMENTAR CANTIDAD

router.post("/cart/increase/:id", (req, res) => {
  const item = req.session.cart.find(p => p.id == req.params.id);
  if (item) item.quantity++;
  res.redirect("/carrito");
});


//  DISMINUIR CANTIDAD

router.post("/cart/decrease/:id", (req, res) => {
  const item = req.session.cart.find(p => p.id == req.params.id);
  if (item && item.quantity > 1) item.quantity--;
  res.redirect("/carrito");
});


// ELIMINAR PRODUCTO

router.post("/cart/remove/:id", (req, res) => {
  req.session.cart = req.session.cart.filter(p => p.id != req.params.id);
  res.redirect("/carrito");
});

module.exports = router;
