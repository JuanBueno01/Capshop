// login_server.js
const express = require("express");
const cors = require("cors");
const db = require("./models/db");

const app = express();

app.use(cors());
app.use(express.json());

// Ruta raíz para comprobar que es este servidor
app.get("/", (req, res) => {
  res.send("SERVIDOR LOGIN EN PUERTO 5000");
});

// 🔐 LOGIN
// Espera: { "correo": "juan@gmail.com", "contrasena": "1234" }
app.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;

  console.log("📥 Body recibido en /login:", req.body);

  if (!correo || !contrasena) {
    return res.status(400).json({
      ok: false,
      mensaje: "Faltan campos: correo y contrasena",
    });
  }

  const sql = "SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?";

  db.query(sql, [correo, contrasena], (err, results) => {
    if (err) {
      console.error("❌ Error en login:", err);
      return res.status(500).json({
        ok: false,
        mensaje: "Error en la base de datos",
      });
    }

    console.log("🔎 Resultados login:", results);

    if (results.length === 0) {
      return res.status(401).json({
        ok: false,
        mensaje: "Correo o contraseña incorrectos",
      });
    }

    const usuario = results[0];
    delete usuario.contraseña;

    res.json({
      ok: true,
      mensaje: "Login correcto",
      usuario,
    });
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SERVIDOR LOGIN escuchando en http://localhost:${PORT}`);
});

module.exports = app;
