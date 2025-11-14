const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "capshop"
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar con MySQL:", err);
    return;
  }
  console.log("Conectado correctamente a MySQL");

  db.query("SHOW TABLES", (err, results) => {
    if (err) {
      console.error("Error al ejecutar query:", err);
    } else {
      console.log("Tablas encontradas:", results);
    }
    db.end();
  });
});
