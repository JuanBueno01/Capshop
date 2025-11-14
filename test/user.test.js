const request = require("supertest");
const app = require("../login_server"); // 👈 importante el .. porque el test está en /test

describe("Pruebas del LOGIN", () => {
  test("Login correcto con credenciales válidas", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        correo: "juan@gmail.com",
        contrasena: "1234", // la que tienes en la BD
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.usuario).toBeDefined();
    expect(res.body.usuario.correo).toBe("juan@gmail.com");
  });

  test("Login incorrecto con contraseña mala", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        correo: "juan@gmail.com",
        contrasena: "contraseña_mala",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.ok).toBe(false);
  });

  test("Login falla si faltan campos", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        correo: "juan@gmail.com",
        // sin contrasena
      });

    expect(res.statusCode).toBe(400);
  });
});
