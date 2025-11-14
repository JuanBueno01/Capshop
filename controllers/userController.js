const db = require("../models/db");

exports.obtenerUsuarios = (req, res) => {
  const sql = "SELECT * FROM usuarios";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(results);
    }
  });
};
