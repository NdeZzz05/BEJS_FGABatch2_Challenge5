const request = require("supertest");
const app = require("../app");

describe("Transactions API", () => {
  // Test case for getting all transactions
  describe("GET /api/v1/transactions", () => {
    it("Get all transactions", async () => {
      const response = await request(app).get("/api/v1/transactions");
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    // error resource not found
    it("should return validation errors when resource not found", async () => {
      const response = await request(app).get("/api/v1/transaction");
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Resource not found");
    });
  });

  //  Transfer
  describe("POST /api/v1/transactions/transfer", () => {
    it("transfer: should create a new Transactions Transfer", async () => {
      const newTransactions = {
        amount: 1000,
        source_account_id: "448268e4-3a24-4a80-a7f2-79b4a9282cdc",
        destination_account_id: "0f51d32a-4af1-4f10-959b-f408ae5c77b3",
        transaction_type_id: "09ff41b2-fa86-4393-bbf2-f3d81f72fc17",
      };
      const response = await request(app).post("/api/v1/transactions/transfer").send(newTransactions);
      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");
      createdTransactionsId = response.body.data.id;
      expect(response.error.message).toBe("Source account not found");
    });

    it("transfer: should return validation error when source account not found", async () => {
      const noSourceAccount = "no-existing-source-account";
      const newTransactions = {
        amount: 1000,
        source_account_id: noSourceAccount,
        destination_account_id: "0f51d32a-4af1-4f10-959b-f408ae5c77b3",
        transaction_type_id: "09ff41b2-fa86-4393-bbf2-f3d81f72fc17",
      };
      const response = await request(app).post("/api/v1/transactions/transfer").send(newTransactions);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Source account not found");
    });
  });

  //   Deposit
  describe("POST /api/v1/transactions/deposit", () => {
    it("deposit: should create a new Transactions deposit", async () => {
      const newTransactions = {
        amount: 1000,
        destination_account_id: "0f51d32a-4af1-4f10-959b-f408ae5c77b3",
        transaction_type_id: "2248641e-7c80-421c-b458-a9ac62dc20fa",
      };
      const response = await request(app).post("/api/v1/transactions/deposit").send(newTransactions);
      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");
    });

    it("deposit: should return validation error when destination account not found", async () => {
      const noDestinationAccount = "no-existing-destination-account";
      const newTransactions = {
        amount: 1000,
        destination_account_id: noDestinationAccount,
        transaction_type_id: "09ff41b2-fa86-4393-bbf2-f3d81f72fc17",
      };
      const response = await request(app).post("/api/v1/transactions/deposit").send(newTransactions);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Destination account not found");
    });
  });

  //   Withdraw
  describe("POST /api/v1/transactions/withdraw", () => {
    it("withdraw: should create a new Transactions withdraw", async () => {
      const newTransactions = {
        amount: 1000,
        source_account_id: "0f51d32a-4af1-4f10-959b-f408ae5c77b3",
        transaction_type_id: "bef1c4e5-fba2-4d2d-bf8e-98c6bfd59e16",
      };
      const response = await request(app).post("/api/v1/transactions/withdraw").send(newTransactions);
      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");
    });

    it("withdraw: should return validation error when source account not found", async () => {
      const noSourceAccount = "no-existing-source-account";
      const newTransactions = {
        amount: 1000,
        source_account_id: noSourceAccount,
        transaction_type_id: "bef1c4e5-fba2-4d2d-bf8e-98c6bfd59e16",
      };
      const response = await request(app).post("/api/v1/transactions/withdraw").send(newTransactions);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Source account not found");
    });

    it("withdraw: should return validation error when amount not 0", async () => {
      const newTransactions = {
        amount: 0,
        source_account_id: "0f51d32a-4af1-4f10-959b-f408ae5c77b3",
        transaction_type_id: "bef1c4e5-fba2-4d2d-bf8e-98c6bfd59e16",
      };
      const response = await request(app).post("/api/v1/transactions/withdraw").send(newTransactions);
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe('"amount" must be a positive number');
    });
  });

  //Get Details Transfer
  describe("GET /api/v1/transactions/:id", () => {
    it("should return Transactions details", async () => {
      const response = await request(app).get(`/api/v1/transactions/${createdTransactionsId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id", createdTransactionsId);
    });

    it("should return validation error when transaction transfer id not found", async () => {
      const noTransferId = "no-transfer-id";
      const response = await request(app).get(`/api/v1/transactions/${noTransferId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toBe("Detail transaction not found");
    });
  });
});
