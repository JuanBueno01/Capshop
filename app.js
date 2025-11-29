const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

// Middleware para leer datos POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sesiones
app.use(
    session({
        secret: "capshop-secret",
        resave: false,
        saveUninitialized: false,
    })
);
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
        console.log(" Carrito inicializado en sesión");
    }
    next();
});
// Static files
app.use(express.static(path.join(__dirname, "public")));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rutas
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const viewRoutes = require("./routes/viewRoutes");

app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", viewRoutes);

app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001");
});
