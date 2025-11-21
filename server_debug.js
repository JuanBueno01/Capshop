const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// CONFIGURAR VISTAS (EJS)
// =========================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =========================
// ARCHIVOS ESTÁTICOS
// =========================
app.use(express.static(path.join(__dirname, "public")));

// =========================
// IMPORTAR CONTROLADORES Y RUTAS
// =========================
const userRoutes = require("./routes/userRoutes");
const productController = require("./controllers/productController");

// =========================
// RUTAS
// =========================
app.use("/", userRoutes);  // login, logout, etc.
app.use("/usuarios", userRoutes); // opcional

// RUTA MENU EJS
app.get("/menu", productController.getMenu);

// =========================
// RUTA PRINCIPAL
// =========================
app.get("/", (req, res) => {
  res.send("CapShop API funcionando");
});

// =========================
// SERVER
// =========================
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`CAPSHOP API escuchando en http://localhost:${PORT}`);
});

module.exports = app;
