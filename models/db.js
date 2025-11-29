const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "capshop",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error(" Error conectando a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL correctamente en puerto 3306");
});

module.exports = db;
