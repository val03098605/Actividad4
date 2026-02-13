const request = require("supertest");
const app = require("../server");

describe("Auth Routes", () => {

  it("Debe iniciar sesión correctamente con admin", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@restaurante.com",
        password: "admin123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("Debe fallar con contraseña incorrecta", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@restaurante.com",
        password: "incorrecta"
      });

    expect(res.statusCode).toBe(400);
  });

});
