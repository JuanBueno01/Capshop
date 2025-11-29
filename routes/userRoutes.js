console.log(" EJECUTANDO userRoutes.js --- LLEGÓ AQUÍ");



const express = require("express");
const router = express.Router();
const db = require("../models/db");
const crypto = require("crypto");


// DEBUG: Saber qué rutas entran acá

router.use((req, res, next) => {
  console.log(" userRoutes recibió:", req.method, req.url);
  next();
});

// GET LOGIN (login2 temporal)

router.get("/login2", (req, res) => {
  res.render("login2", { error: null });
});


// GET LOGIN (login original)

router.get("/login", (req, res) => {
  res.render("login", { error: null });
});


// POST LOGIN

router.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;

  console.log(" POST /login BODY:", req.body);

  if (!correo || !contrasena) {
    return res.render("login", { error: "Debes ingresar correo y contraseña" });
  }

  const sql = "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?";

  db.query(sql, [correo, contrasena], (err, results) => {
    if (err) {
      console.error(" Error DB:", err);
      return res.render("login", { error: "Error en la base de datos" });
    }

    if (results.length === 0) {
      console.log(" Usuario NO encontrado");
      return res.render("login", { error: "Correo o contraseña incorrectos" });
    }

    const usuario = results[0];

    // Guardar sesión
    req.session.user = {
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    };

    console.log(" Usuario logueado:", req.session.user);

    return res.redirect("/menu");
  });
});


// LOGOUT

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// GET REGISTER

router.get("/register", (req, res) => {
  res.render("register", { error: null });
});


// POST REGISTER

router.post("/register", (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  if (!nombre || !correo || !contrasena) {
    return res.render("register", { error: "Todos los campos son obligatorios" });
  }

  // Ver si el correo ya existe
  const sqlCheck = "SELECT * FROM usuarios WHERE correo = ?";
  db.query(sqlCheck, [correo], (err, results) => {
    if (err) {
      console.error(" Error DB:", err);
      return res.render("register", { error: "Error en la base de datos" });
    }

    if (results.length > 0) {
      return res.render("register", { error: "Correo ya registrado" });
    }

    const sqlInsert = "INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)";

    db.query(sqlInsert, [nombre, correo, contrasena], (err2) => {
      if (err2) {
        console.error(" Error insertando usuario:", err2);
        return res.render("register", { error: "Error al crear usuario" });
      }

      return res.redirect("/login");
    });
  });
});

module.exports = router;
