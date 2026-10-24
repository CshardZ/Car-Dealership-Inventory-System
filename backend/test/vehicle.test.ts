import request from "supertest";
import app from "../src/app";
import User from "../src/models/User";
import bcrypt from "bcrypt";


describe("Vehicle API", () => {
  let vehicleId: string;
  let userToken: string;
  let adminToken: string;

  beforeAll(async () => {
    // Normal user
    const user = {
      name: "Vehicle Test User",
      email: `vehicle-test-${Date.now()}@example.com`,
      password: "Password123",
    };

    await request(app)
      .post("/api/auth/register")
      .send(user);

    const userLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: user.password,
      });

    userToken = userLogin.body.token;

    // Admin user
    const adminPassword = await bcrypt.hash("Password123", 10);

    const admin = await User.create({
      name: "Vehicle Test Admin",
      email: `admin-test-${Date.now()}@example.com`,
      password: adminPassword,
      role: "admin",
    });

    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: admin.email,
        password: "Password123",
      });

    adminToken = adminLogin.body.token;
  });

  it("should create a vehicle", async () => {
    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        make: "Toyota",
        model: "Camry",
        category: "Sedan",
        price: 25000,
        quantity: 5,
      });

    expect(response.status).toBe(201);

    vehicleId = response.body._id;
  });

  it("should get all vehicles", async () => {
    const response = await request(app)
      .get("/api/vehicles")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should search vehicles by make", async () => {
    const response = await request(app)
      .get("/api/vehicles/search")
      .set("Authorization", `Bearer ${userToken}`)
      .query({ make: "Toyota" });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should update a vehicle", async () => {
    const response = await request(app)
      .put(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        price: 27000,
      });

    expect(response.status).toBe(200);
  });

  it("should purchase a vehicle", async () => {
    const response = await request(app)
      .post(`/api/vehicles/${vehicleId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.vehicle.quantity).toBe(4);
  });

  it("should reject restock for normal user", async () => {
    const response = await request(app)
      .post(`/api/vehicles/${vehicleId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        quantity: 3,
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Admin access required");
  });

  it("should allow admin to restock a vehicle", async () => {
    const response = await request(app)
      .post(`/api/vehicles/${vehicleId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        quantity: 3,
      });

    expect(response.status).toBe(200);
    expect(response.body.vehicle.quantity).toBe(7);
  });

  it("should reject delete for normal user", async () => {
    const response = await request(app)
      .delete(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Admin access required");
  });

  it("should allow admin to delete a vehicle", async () => {
    const response = await request(app)
      .delete(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Vehicle deleted successfully"
    );
  });
});