// routes/productos.routes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Producto = require("../models/Producto"); // Crear modelo Producto.js

// Crear producto (solo admin)
router.post("/", auth(["admin"]), async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria } = req.body;

    const producto = new Producto({
      nombre,
      descripcion,
      precio,
      stock,
      categoria   
    });

    await producto.save();

    res.status(201).json(producto);

  } catch (error) {
    console.error("Error real:", error);
    res.status(500).json({ error: error.message });
  }
});


// Listar productos (todos los roles)
router.get("/", auth(["admin", "cliente"]), async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener productos" });
  }
});

// Actualizar producto (solo admin)
router.put("/:id", auth(["admin"]), async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar producto" });
  }
});

// Eliminar producto (solo admin)
router.delete("/:id", auth(["admin"]), async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ msg: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ msg: "Error al eliminar producto" });
  }
});

module.exports = router;
