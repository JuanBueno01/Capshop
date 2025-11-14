
const express = require("express");
const path = require("path");
const db = require("./models/db");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Getlogin  muestra formulario
app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// POSTlogin procesa formulario y muestra menú
app.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;

  console.log("Body recibido en /login :", req.body);

  if (!correo || !contrasena) {
    return res.status(400).render("login", {
      error: "Debes ingresar correo y contraseña",
    });
  }

  const sql = "SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?";

  db.query(sql, [correo, contrasena], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).render("login", {
        error: "Error interno en la base de datos",
      });
    }

    console.log(" Resultados login :", results);

    if (results.length === 0) {
      return res.status(401).render("login", {
        error: "Correo o contraseña incorrectos",
      });
    }

    const usuario = results[0];
    delete usuario.contraseña;

    
    return res.render("menu", { usuario });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`SERVIDOR LOGIN escuchando en http://localhost:${PORT}`);
});
