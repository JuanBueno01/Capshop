const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/", (req, res) => {
  console.log("GET /usuarios recibido");

  const sql = "SELECT * FROM usuarios";

  db.query(sql, (err, results) => {
    console.log(" Resultado de la query:");
    console.log("   err    ->", err);
    console.log("   results->", results);

    // Para debug siempre se devuelve err y results tal cual
    res.json({
      mensaje: "Respuesta de prueba",
      err,
      results,
    });
  });
});

module.exports = router;
