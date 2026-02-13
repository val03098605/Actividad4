const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No hay token, acceso denegado" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;

      if (roles.length && !roles.includes(decoded.rol)) {
        return res.status(403).json({ msg: "No tienes permisos para esta acción" });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: "Token no válido" });
    }
  };
};

module.exports = auth;
