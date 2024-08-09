const request = require("supertest");
const app = require("../app");
const data = require("./data");
describe("User API", () => {
  let createdUserId;

  describe("GET /api/v1/users", () => {
    it("should return a list of users", async () => {
      const response = await request(app).get("/api/v1/users").set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    // Tes case - Resource not found
    it("should return a list of user", async () => {
      const response = await request(app).get("/api/v1/user").set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Resource not found");
    });
  });

  //Get Details
  describe("GET /api/v1/users/:id", () => {
    it("should return user details", async () => {
      const UserId = "fa643de1-3873-4a29-995e-8b96dc600f1c";
      const response = await request(app).get(`/api/v1/users/${UserId}`).set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id", UserId);
    });

    it("should return no user details", async () => {
      const noUserId = "non-existing-id";
      const response = await request(app).get(`/api/v1/users/${noUserId}`).set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("User not found");
    });
  });

  //put
  describe("PUT /api/v1/users/:id", () => {
    const UserId = "966a8d31-209c-401a-8814-08e101086346";
    it("should update user details", async () => {
      const updatedUser = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "Password123*",
        identity_type: "SIM",
        identity_number: "987654321",
        street: "456 Another St",
        city: "Othertown",
        state: "Otherstate",
        postal_code: "54321",
        country: "Othercountry",
        company_name: "Other Company",
        position: "Other Position",
      };

      const response = await request(app).put(`/api/v1/users/${UserId}`).send(updatedUser).set("Authorization", `Bearer ${data.token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
    });

    // User Not Found
    it("should return validation errors when updating user because id user not found", async () => {
      const updatedUser = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "Password123*",
        identity_type: "SIM",
        identity_number: "987654321",
        street: "456 Another St",
        city: "Othertown",
        state: "Otherstate",
        postal_code: "54321",
        country: "Othercountry",
        company_name: "Other Company",
        position: "Other Position",
      };
      const noUserId = "id";
      const response = await request(app).put(`/api/v1/users/${noUserId}`).send(updatedUser).set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("User not found");
    });
  });

  //Delete
  describe("DELETE /api/v1/users/:id", () => {
    it("should return no user DELETE because user not found", async () => {
      const noUserId = "non-existing-id";
      const response = await request(app).del(`/api/v1/users/${noUserId}`).set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("User not found");
    });
  });
});
