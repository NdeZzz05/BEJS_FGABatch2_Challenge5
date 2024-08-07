const request = require("supertest");
const app = require("../app");

describe("User API", () => {
  let createdUserId;

  describe("GET /api/v1/users", () => {
    it("should return a list of users", async () => {
      const response = await request(app).get("/api/v1/users");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    // Tes case - Resource not found
    it("should return a list of user", async () => {
      const response = await request(app).get("/api/v1/user");
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Resource not found");
    });
  });

  describe("POST /api/v1/users", () => {
    it("should create a new user", async () => {
      const newUser = {
        name: "John Doe7",
        email: "johndoe7@example.com",
        password: "Password123*",
        identity_type: "KTP",
        identity_number: "1234567897",
        street: "123 Main St",
        city: "Anytown",
        state: "Anystate",
        postal_code: "12345",
        country: "Anycountry",
        company_name: "Any Company",
        position: "Any Position",
      };

      const response = await request(app).post("/api/v1/users").send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");

      createdUserId = response.body.data.id;
    });

    // Bad request, required fields
    it("should return validation errors when creating a new user because required fields (name is required)", async () => {
      const newUser = {
        email: "johndoe7@example.com",
        password: "Password123*",
        identity_type: "KTP",
        identity_number: "1234567897",
        street: "123 Main St",
        city: "Anytown",
        state: "Anystate",
        postal_code: "12345",
        country: "Anycountry",
        company_name: "Any Company",
        position: "Any Position",
      };

      const response = await request(app).post("/api/v1/users").send(newUser);

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('"name" is required');
    });

    // email already exists
    it("should return validation errors when creating a new user because email same", async () => {
      const newUser = {
        name: "John Doe",
        email: "johndoe7@example.com",
        password: "Password123*",
        identity_type: "KTP",
        identity_number: "123456789788",
        street: "123 Main St",
        city: "Anytown",
        state: "Anystate",
        postal_code: "12345",
        country: "Anycountry",
        company_name: "Any Company",
        position: "Any Position",
      };
      const response = await request(app).post("/api/v1/users").send(newUser);
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });

    // Identity number already exists
    it("should return validation errors when updating user because Identity number already exists", async () => {
      const updatedUser = {
        name: "Jane Doe",
        email: "jane.doe11@example.com",
        password: "Password123*",
        identity_type: "SIM",
        identity_number: "1234567897",
        street: "456 Another St",
        city: "Othertown",
        state: "Otherstate",
        postal_code: "54321",
        country: "Othercountry",
        company_name: "Other Company",
        position: "Other Position",
      };
      const response = await request(app).post(`/api/v1/users`).send(updatedUser);
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Identity number already exists");
    });
  });

  //Get Details
  describe("GET /api/v1/users/:id", () => {
    it("should return user details", async () => {
      const response = await request(app).get(`/api/v1/users/${createdUserId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id", createdUserId);
    });

    it("should return no user details", async () => {
      const noUserId = "non-existing-id";
      const response = await request(app).get(`/api/v1/users/${noUserId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("User not found");
    });
  });

  //put
  describe("PUT /api/v1/users/:id", () => {
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

      const response = await request(app).put(`/api/v1/users/${createdUserId}`).send(updatedUser);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("name", "Jane Doe");
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
      const noUserId = "non-existing-id";
      const response = await request(app).put(`/api/v1/users/${noUserId}`).send(updatedUser);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("User not found");
    });
  });

  //Delete
  describe("DELETE /api/v1/users/:id", () => {
    it("should delete the user", async () => {
      const response = await request(app).delete(`/api/v1/users/${createdUserId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User deleted successfully");
    });

    it("should return no user DELETE because user not found", async () => {
      const noUserId = "non-existing-id";
      const response = await request(app).del(`/api/v1/users/${noUserId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("User not found");
    });
  });
});
