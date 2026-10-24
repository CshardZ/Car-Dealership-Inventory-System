import request from "supertest";
import app from "../src/app";


describe("Auth API", () => {
  const user = {
    name: "Test User",
    email: `test-${Date.now()}@example.com`,
    password: "Password123",
  };

  it("should register a user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
    expect(response.body.user.email).toBe(user.email);
    expect(response.body.user).not.toHaveProperty("password");
  });

  it("should reject duplicate email", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email already registered");
  });

  it("should login with valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();
  });

  it("should reject an incorrect password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: "WrongPassword123",
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("should reject an unknown email", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "doesnotexist@example.com",
        password: "Password123",
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });
});