// routes/pedidos.routes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Pedido = require("../models/Pedido"); // Crear modelo Pedido.js

// Crear pedido (solo cliente)
router.post("/", auth(["cliente"]), async (req, res) => {
  try {
    const pedido = new Pedido({ ...req.body, usuario: req.usuario.id });
    await pedido.save();
    res.status(201).json(pedido);
  } catch (err) {
    res.status(500).json({ msg: "Error al crear pedido" });
  }
});

// Listar pedidos del cliente
router.get("/", auth(["cliente"]), async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuario.id });
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener pedidos" });
  }
});

module.exports = router;
