const express = require("express");
const router = express.Router();
const db = require("../models/db");
const crypto = require("crypto");

// ======================================================
//  GET LOGIN
// ======================================================
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// ======================================================
//  POST LOGIN
// ======================================================
router.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena)
    return res.status(400).render("login", { error: "Debes ingresar correo y contraseña" });

  const sql = "SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?";
  db.query(sql, [correo, contrasena], (err, results) => {
    if (err)
      return res.status(500).render("login", { error: "Error interno en la base de datos" });

    if (results.length === 0)
      return res.status(401).render("login", { error: "Correo o contraseña incorrectos" });

    const usuario = results[0];
    delete usuario.contraseña;

    return res.redirect(`/menu?user=${usuario.nombre}`);
  });
});

// ======================================================
//  GET REGISTER
// ======================================================
router.get("/register", (req, res) => {
  res.render("register", { error: null });
});

// ======================================================
//  POST REGISTER
// ======================================================
router.post("/register", (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  if (!nombre || !correo || !contrasena)
    return res.status(400).render("register", { error: "Todos los campos son obligatorios" });

  const sqlCheck = "SELECT * FROM usuarios WHERE correo = ?";
  db.query(sqlCheck, [correo], (err, results) => {
    if (err)
      return res.status(500).render("register", { error: "Error en la base de datos" });

    if (results.length > 0)
      return res.status(400).render("register", { error: "Correo ya registrado" });

    const sqlInsert = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)";
    db.query(sqlInsert, [nombre, correo, contrasena], (err2) => {
      if (err2)
        return res.status(500).render("register", { error: "Error al crear usuario" });

      return res.redirect("/login");
    });
  });
});

// ======================================================
//  GET FORGOT PASSWORD
// ======================================================
router.get("/forgot", (req, res) => {
  res.render("forgot", { error: null, mensaje: null });
});

// ======================================================
//  POST FORGOT PASSWORD (SIMULADO)
// ======================================================
router.post("/forgot", (req, res) => {
  const { correo } = req.body;

  if (!correo)
    return res.status(400).render("forgot", { error: "Ingresa un correo" });

  const sql = "SELECT * FROM usuarios WHERE correo = ?";
  db.query(sql, [correo], (err, results) => {
    if (err)
      return res.status(500).render("forgot", { error: "Error en la base de datos" });

    if (results.length === 0)
      return res.status(404).render("forgot", { error: "Correo no encontrado" });

    const token = crypto.randomBytes(20).toString("hex");

    return res.render("forgot", {
      mensaje: `Simulación: haz click aquí para restablecer tu contraseña: 
                <a href="/reset-password/${token}">Restablecer contraseña</a>`,
      error: null
    });
  });
});

// ======================================================
//  GET RESET PASSWORD
// ======================================================
router.get("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  res.render("reset", { token, error: null, mensaje: null });
});

// ======================================================
//  POST RESET PASSWORD (SIMULADO)
// ======================================================
router.post("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  const { contrasena } = req.body;

  if (!contrasena)
    return res.render("reset", { token, error: "Ingresa una contraseña", mensaje: null });

  const sql = "UPDATE usuarios SET contraseña = ? ORDER BY id ASC LIMIT 1";

  db.query(sql, [contrasena], (err) => {
    if (err)
      return res.render("reset", { token, error: "Error al actualizar", mensaje: null });

    return res.render("reset", {
      token,
      mensaje: "Contraseña actualizada correctamente. Ya puedes iniciar sesión.",
      error: null
    });
  });
});

// ======================================================
//  GET MENU (PANTALLA PRINCIPAL)
// ======================================================
router.get("/menu", (req, res) => {
  const userName = req.query.user ?? "Invitado";

  const mockProducts = [
    { name: "La Classic", price: "$45.900", desc: "La más consentida", img: "/img/gorra1.jpg" },
    { name: "Trucker", price: "$48.500", desc: "Estilo clásico", img: "/img/gorra2.jpg" },
    { name: "Blue Skies Cap", price: "$54.300", desc: "Estilo fresco", img: "/img/gorra3.jpg" },
    { name: "Red Edition", price: "$49.900", desc: "Color potente", img: "/img/gorra4.jpg" },
  ];

  res.render("menu", {
    userName,
    products: mockProducts
  });
});

module.exports = router;
