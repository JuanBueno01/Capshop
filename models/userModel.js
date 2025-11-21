// models/userModel.js

const db = require("./db");

// Registrar un nuevo usuario
const crearUsuario = (usuario, callback) => {
  const sql = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)";
  db.query(sql, [usuario.nombre, usuario.correo, usuario.contraseña], callback);
};

// Obtener todos los usuarios
const obtenerUsuarios = (callback) => {
  db.query("SELECT * FROM usuarios", callback);
};

// Login de usuario
const login = (correo, contrasena, callback) => {
  const sql = "SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?";
  db.query(sql, [correo, contrasena], callback);
};

module.exports = { crearUsuario, obtenerUsuarios, login };
