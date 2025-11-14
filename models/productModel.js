const db = require("./db");

// Obtener todos los productos
const obtenerProductos = (callback) => {
  db.query("SELECT * FROM productos", callback);
};

// Obtener un producto por ID
const obtenerProductoPorId = (id, callback) => {
  db.query("SELECT * FROM productos WHERE id = ?", [id], callback);
};

// Crear un nuevo producto
const crearProducto = (producto, callback) => {
  const sql = "INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [producto.nombre, producto.descripcion, producto.precio, producto.stock, producto.imagen], callback);
};

// Actualizar un producto existente
const actualizarProducto = (id, producto, callback) => {
  const sql = "UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, imagen=? WHERE id=?";
  db.query(sql, [producto.nombre, producto.descripcion, producto.precio, producto.stock, producto.imagen, id], callback);
};

// Eliminar un producto
const eliminarProducto = (id, callback) => {
  db.query("DELETE FROM productos WHERE id = ?", [id], callback);
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
