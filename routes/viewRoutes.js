console.log(" EJECUTANDO viewRoutes.js --- LLEGÓ AQUÍ");

const express = require("express");
const router = express.Router();
const productModel = require("../models/productModel");

// DEBUG: Saber qué rutas entran a viewRoutes
router.use((req, res, next) => {
  console.log(" viewRoutes recibió:", req.method, req.url);
  next();
});

// ============ RUTAS TEST ============
router.get("/test-direct", (req, res) => {
  console.log(" test-direct funcionando");
  res.send(" test-direct funcionando");
});

router.get("/test-product", (req, res) => {
  console.log(" Ruta TEST funcionando");
  res.send(" Ruta TEST funcionando (desde viewRoutes)");
});

// RUTA MENU 
router.get("/menu", (req, res) => {
  console.log(" Entrando a GET /menu");

  productModel.obtenerProductos((err, productos) => {
    if (err) {
      console.error(" Error al cargar productos:", err);
      return res.status(500).send("Error al cargar productos");
    }

    res.render("menu", {
      products: productos,
      userName: "Invitado"
    });
  });
});

//  RUTA DETALLE PRODUCTO 
router.get("/product/:id", (req, res) => {
  const id = req.params.id;
  console.log(" Entrando a GET /product/:id con id =", id);

  productModel.obtenerProductoPorId(id, (err, resultado) => {
    if (err) {
      console.error("Error en consulta:", err);
      return res.status(500).send("Error DB");
    }

    console.log(" RESULTADO SQL :", JSON.stringify(resultado, null, 2));

    if (!resultado || resultado.length === 0) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("productDetail", { product: resultado[0] });
  });
});

// 🛒 RUTA PARA MOSTRAR EL CARRITO

router.get("/carrito", (req, res) => {
  const cart = req.session.cart || [];

  // Calcular subtotal EXACTO
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += parseFloat(item.price) * item.quantity;
  });

  // Envío en USD
  const envio = 5.00;

  // Total
  const total = subtotal + envio;

  // Formateo USD
  const formatoUSD = (valor) =>
    valor.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

  res.render("carrito", {
    cart,
    subtotal: formatoUSD(subtotal),
    envio: formatoUSD(envio),
    total: formatoUSD(total)
  });
});

// EXPORTAR
module.exports = router;
