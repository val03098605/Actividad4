require("dotenv").config();
const mongoose = require("mongoose");
const Usuario = require("../models/Usuario");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

async function crearUsuarios() {
  try {
    // Admin
    const admin = new Usuario({
      nombre: "Admin",
      email: "admin@restaurante.com",
      password: "admin123",
      rol: "admin",
    });

    // Cliente
    const cliente = new Usuario({
      nombre: "Cliente",
      email: "cliente@restaurante.com",
      password: "cliente123",
      rol: "cliente",
    });

    await admin.save();
    await cliente.save();

    console.log("Usuarios creados con éxito");
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
    mongoose.disconnect();
  }
}

crearUsuarios();
