const db = require("./db");

// Obtener todos los productos
exports.obtenerProductos = (callback) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) return callback(err, []);
    callback(null, results);
  });
};

// Obtener producto por ID
exports.obtenerProductoPorId = (id, callback) => {
  const sql = "SELECT * FROM productos WHERE id_producto = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};
