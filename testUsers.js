const db = require("./models/db");

db.query("SELECT * FROM usuarios", (err, results) => {
  if (err) {
    console.error("❌ Error al obtener usuarios directamente:", err);
    return;
  }
  console.log("✅ Usuarios obtenidos correctamente desde testUsers:", results);
  process.exit();
});
