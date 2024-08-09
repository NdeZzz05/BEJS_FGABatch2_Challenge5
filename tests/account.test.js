const request = require("supertest");
const app = require("../app");
const data = require("./data");

describe("Account API", () => {
  let createAccountId;

  describe("GET /api/v1/accounts", () => {
    it("should return a list of accounts", async () => {
      const response = await request(app).get("/api/v1/accounts");
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should return validation errors when get all account because (/account)", async () => {
      const response = await request(app).get("/api/v1/account");
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Resource not found");
    });
  });

  //rubah user_id menggunakan user_id terbaru apabila hanya ngepost
  describe("POST /api/v1/accounts", () => {
    it("should create a new accounts", async () => {
      const newAccounts = {
        bank_name: "John Doe 5",
        pin: "123456",
        balance: 100000,
        user_id: "cb107d9d-e556-4539-a88f-d7c01398440f",
      };

      const response = await request(app).post("/api/v1/accounts").send(newAccounts);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");

      createAccountId = response.body.data.id;
    });

    it("should return validation errors when creating account because user not found", async () => {
      const newAccounts = {
        bank_name: "John Doe 5",
        pin: "123456",
        balance: 100000,
        user_id: "user_not_found",
      };

      const response = await request(app).post("/api/v1/accounts").send(newAccounts);

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("User not found");
    });

    it("should return validation errors when creating account because field bank name required", async () => {
      const newAccounts = {
        // bank_name: "",
        pin: "123456",
        balance: 100000,
        user_id: "user_not_found",
      };

      const response = await request(app).post("/api/v1/accounts").send(newAccounts).set("Authorization", `Bearer ${data.token}`);

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('"bank_name" is required');
    });

    it("should return validation errors when creating account because field bank name (not allowed to be empty)", async () => {
      const newAccounts = {
        bank_name: "",
        pin: "123456",
        balance: 100000,
        user_id: "user_not_found",
      };

      const response = await request(app).post("/api/v1/accounts").send(newAccounts).set("Authorization", `Bearer ${data.token}`);

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('"bank_name" is not allowed to be empty');
    });
  });

  //Get Details
  describe("GET /api/v1/accounts/:id", () => {
    it("should return accounts details", async () => {
      const response = await request(app).get(`/api/v1/accounts/${createAccountId}`).set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id", createAccountId);
    });

    it("should return validation errors when get detail account because account not fount", async () => {
      const noAccountId = "non-existing-id";
      const response = await request(app).get(`/api/v1/accounts/${noAccountId}`).set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Account not found");
    });
  });

  //put
  describe("PUT /api/v1/accounts/:id", () => {
    it("should update accounts details", async () => {
      const updatedAccounts = {
        bank_name: "Fernandes Ahmad",
        pin: "123456",
      };
      const response = await request(app).put(`/api/v1/accounts/${createAccountId}`).send(updatedAccounts).set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("bank_name", "Fernandes Ahmad");
    });

    it("should return validation errors when update account because account not found", async () => {
      const noAccountId = "non-existing-id";
      const updatedAccounts = {
        bank_name: "Fernandes Ahmad",
        pin: "123456",
      };
      const response = await request(app).put(`/api/v1/accounts/${noAccountId}`).send(updatedAccounts).set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Account not found");
    });

    it("should return validation errors when update account because bank_name (not allowed to be empty)", async () => {
      const updatedAccounts = {
        bank_name: "",
        pin: "123456",
      };
      const response = await request(app).put(`/api/v1/accounts/${createAccountId}`).send(updatedAccounts).set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('"bank_name" is not allowed to be empty');
    });
  });

  //Delete
  describe("DELETE /api/v1/accounts/:id", () => {
    it("should delete the account", async () => {
      const response = await request(app).delete(`/api/v1/accounts/${createAccountId}`).set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Account deleted successfully");
    });

    it("should return validation errors when delete account because account not found", async () => {
      const noAccountId = "non-existing-id";
      const response = await request(app).delete(`/api/v1/accounts/${noAccountId}`).set("Authorization", `Bearer ${data.token}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Account not found");
    });
  });
});
