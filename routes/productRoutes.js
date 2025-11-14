const express = require("express");
const router = express.Router();
const productModel = require("../models/productModel");

// Obtener todos los productos
router.get("/", (req, res) => {
  productModel.obtenerProductos((err, resultados) => {
    if (err) return res.status(500).send("Error al obtener productos");
    res.json(resultados);
  });
});

// Obtener producto por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  productModel.obtenerProductoPorId(id, (err, resultado) => {
    if (err) return res.status(500).send("Error al obtener producto");
    if (resultado.length === 0) return res.status(404).send("Producto no encontrado");
    res.json(resultado[0]);
  });
});

// Crear nuevo producto
router.post("/", (req, res) => {
  const nuevoProducto = req.body;
  productModel.crearProducto(nuevoProducto, (err, resultado) => {
    if (err) return res.status(500).send("Error al crear producto");
    res.json({ mensaje: "Producto agregado correctamente", id: resultado.insertId });
  });
});

// Actualizar producto
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  productModel.actualizarProducto(id, datosActualizados, (err) => {
    if (err) return res.status(500).send("Error al actualizar producto");
    res.json({ mensaje: "Producto actualizado correctamente" });
  });
});

// Eliminar producto
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  productModel.eliminarProducto(id, (err) => {
    if (err) return res.status(500).send("Error al eliminar producto");
    res.json({ mensaje: "Producto eliminado correctamente" });
  });
});

module.exports = router;