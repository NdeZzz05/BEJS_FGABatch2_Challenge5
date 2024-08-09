const { NotFoundError } = require("../errors/customsErrors");
const ACCOUNT_MODELS = require("../models/account.models");
const USER_MODELS = require("../models/user.models");

const ACCOUNT_SERVICES = {
  getAllAccount: async (data) => {
    const { bank_name, bank_account_number } = data;

    const where = {};

    if (bank_name) where.bank_name = { contains: bank_name, mode: "insensitive" };
    if (bank_account_number) where.bank_account_number = bank_account_number;

    const result = await ACCOUNT_MODELS.getAllAccount(where);

    return result;
  },

  getDetailAccount: async (id) => {
    const result = await ACCOUNT_MODELS.getDetailAccount(id);
    if (!result) {
      throw new NotFoundError("Account not found");
    }
    return result;
  },

  createAccount: async (data) => {
    const { user_id } = data;

    const checkUserById = await USER_MODELS.getDetailUser(user_id);
    if (!checkUserById) throw new NotFoundError("User not found");

    const result = await ACCOUNT_MODELS.createAccount(data);
    return result;
  },

  updateAccount: async (id, data) => {
    const checkAccount = await ACCOUNT_MODELS.getDetailAccount(id);
    if (!checkAccount) throw new NotFoundError("Account not found");

    const result = await ACCOUNT_MODELS.updateAccount(id, data);
    return result;
  },

  deleteAccount: async (id) => {
    const checkAccount = await ACCOUNT_MODELS.getDetailAccount(id);

    if (!checkAccount) {
      throw new NotFoundError("Account not found");
    }

    try {
      const result = await ACCOUNT_MODELS.deleteAccount(id);
      return result;
    } catch (error) {
      return error;
    }
  },
};

module.exports = ACCOUNT_SERVICES;
