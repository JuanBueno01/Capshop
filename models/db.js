const mysql = require("mysql2");

// Configuración de conexión
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "capshop",
});

// Intentar conexión al iniciar
db.connect((err) => {
  if (err) {
    console.error("Error al conectar con MySQL:", err.message);
  } else {
    console.log("Conexión a MySQL establecida correctamente.");
  }
});

module.exports = db;
