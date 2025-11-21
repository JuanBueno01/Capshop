
const express = require("express");
const cors = require("cors");
const db = require("./models/db"); 

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("SERVIDOR DEBUG EN PUERTO 4000");
});


app.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;

  console.log("Body recibido en /login:", req.body);

  
  if (!correo || !contrasena) {
    return res.status(400).json({
      ok: false,
      mensaje: "Faltan campos obligatorios",
    });
  }

  
  const sql = "SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?";

  db.query(sql, [correo, contrasena], (err, results) => {
    if (err) {
      console.error(" Error en la consulta:", err); 
      return res.status(500).json({
        ok: false,
        mensaje: "Error en la base de datos",
      });
    }

    console.log("Resultados login:", results);

    // 3) Si no hay usuario
    if (results.length === 0) {
      return res.status(401).json({
        ok: false,
        mensaje: "Correo o contraseña incorrectos",
      });
    }

    
    const usuario = results[0];
    delete usuario.contraseña; 

    return res.json({
      ok: true,
      mensaje: "Login correcto",
      usuario,
    });
  });
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`CAPXHOP API escuchando en http://localhost:${PORT}`);
});
