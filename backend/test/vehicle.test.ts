import request from "supertest";
import app from "../src/app";


describe("Vehicle API", () => {
  let vehicleId: string;
  let token: string;

  beforeAll(async () => {
    const user = {
      name: "Vehicle Test User",
      email: `vehicle-test-${Date.now()}@example.com`,
      password: "Password123",
    };

    await request(app)
      .post("/api/auth/register")
      .send(user);

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: user.password,
      });

    token = loginResponse.body.token;
  });

  it("should create a vehicle", async () => {
    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Camry",
        category: "Sedan",
        price: 25000,
        quantity: 5,
      });

    expect(response.status).toBe(201);
    expect(response.body.make).toBe("Toyota");
    expect(response.body.model).toBe("Camry");
    expect(response.body.quantity).toBe(5);

    vehicleId = response.body._id;
  });

  it("should get all vehicles", async () => {
    const response = await request(app)
      .get("/api/vehicles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should search vehicles by make", async () => {
    const response = await request(app)
      .get("/api/vehicles/search")
      .set("Authorization", `Bearer ${token}`)
      .query({ make: "Toyota" });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should update a vehicle", async () => {
    const response = await request(app)
      .put(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 27000,
      });

    expect(response.status).toBe(200);
    expect(response.body.price).toBe(27000);
  });

  it("should purchase a vehicle", async () => {
    const response = await request(app)
      .post(`/api/vehicles/${vehicleId}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.vehicle.quantity).toBe(4);
  });

  it("should restock a vehicle", async () => {
    const response = await request(app)
      .post(`/api/vehicles/${vehicleId}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        quantity: 3,
      });

    expect(response.status).toBe(200);
    expect(response.body.vehicle.quantity).toBe(7);
  });

  it("should delete a vehicle", async () => {
    const response = await request(app)
      .delete(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Vehicle deleted successfully"
    );
  });
});