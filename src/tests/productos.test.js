const request = require("supertest");
const app = require("../server");

let tokenAdmin;
let tokenCliente;

beforeAll(async () => {
  // Login admin
  const resAdmin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@restaurante.com",
      password: "admin123"
    });

  tokenAdmin = resAdmin.body.token;

  // Login cliente
  const resCliente = await request(app)
    .post("/api/auth/login")
    .send({
      email: "cliente@restaurante.com",
      password: "cliente123"
    });

  tokenCliente = resCliente.body.token;
});

describe("Productos - Roles", () => {

  it("Admin debe poder crear producto", async () => {
    const res = await request(app)
      .post("/api/productos")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        nombre: "Hamburguesa Test",
        descripcion: "Prueba producto",
        precio: 50,
        stock: 5,
        categoria: "Comida"   // 👈 AQUÍ agregamos categoria
      });

    console.log("Respuesta crear producto:", res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe("Hamburguesa Test");
  });

  it("Cliente NO debe poder crear producto", async () => {
    const res = await request(app)
      .post("/api/productos")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send({
        nombre: "Producto Cliente",
        descripcion: "No permitido",
        precio: 20,
        stock: 2,
        categoria: "Bebida"   // 👈 AQUÍ también
      });

    expect(res.statusCode).toBe(403);
  });

});
