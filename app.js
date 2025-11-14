const express = require("express");
const cors = require("cors");
const db = require("./models/db"); // conexión a MySQL

const app = express();

app.use(cors());
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("CAPSHOP API corriendo con MySQL (PUERTO 3001)");
});

// Ruta oficial de usuarios
app.get("/usuarios", (req, res) => {
  console.log("GET /usuarios recibido en puerto 3001");

  const sql = "SELECT * FROM usuarios";

  db.query(sql, (err, results) => {
    console.log("   err    ->", err);
    console.log("   results->", results);

    if (err) {
      return res.status(500).json({
        mensaje: "Error en la base de datos",
        code: err.code,
        sqlMessage: err.sqlMessage,
      });
    }

    res.json(results); 
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`CAPSHOP API escuchando en http://localhost:${PORT}`);
});
