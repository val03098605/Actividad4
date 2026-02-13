const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());

// Conectar a MongoDB solo si no está conectado
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log(err));
}

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/productos", require("./routes/productos.routes"));
app.use("/api/pedidos", require("./routes/pedidos.routes"));

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

module.exports = app;
