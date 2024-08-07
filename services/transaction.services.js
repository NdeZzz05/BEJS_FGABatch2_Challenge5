const { NotFoundError, BadRequest } = require("../errors/customsErrors");
const ACCOUNT_MODELS = require("../models/account.models");
const TRANSACTION_MODELS = require("../models/transaction.models");

const TRANSACTION_SERVICES = {
  getAllTransaction: async (data) => {
    const { type, startDate, endDate } = data;
    const types = type ? type.split(",") : [];

    const where = {};

    if (types.length > 0) {
      where.transaction_type = { name: { in: types } };
    }
    if (startDate) {
      where.date = {
        ...where.date,
        gte: new Date(startDate),
      };
    }
    if (endDate) {
      where.date = {
        ...where.date,
        lte: new Date(endDate),
      };
    }

    const result = await TRANSACTION_MODELS.getAllTransaction(where);

    return result;
  },

  getDetailTransaction: async (id) => {
    const result = await TRANSACTION_MODELS.getDetailTransaction(id);

    if (!result) {
      throw new NotFoundError("Detail transaction not found");
    }

    return result;
  },

  createTransfer: async (data) => {
    const { amount, source_account_id, destination_account_id, transaction_type_id } = data;

    const checkSourceAccount = await ACCOUNT_MODELS.getDetailAccount(source_account_id);

    if (!checkSourceAccount) throw new NotFoundError("Source account not found");
    if (checkSourceAccount.balance < amount) throw new BadRequest("Insufficient balance");

    const updatedSourceAccount = await ACCOUNT_MODELS.updateDecrementSourceAccount(data);

    const destinationAccount = await ACCOUNT_MODELS.getDetailAccount(destination_account_id);
    if (!destinationAccount) throw new NotFoundError("Destination account not found");

    const updatedDestinationAccount = await ACCOUNT_MODELS.updateIncrementDestinationAccount(data);

    const createTransaction = await TRANSACTION_MODELS.createTransfer(data);

    return createTransaction;
  },

  createDeposit: async (data) => {
    const { destination_account_id } = data;

    const destinationAccount = await ACCOUNT_MODELS.getDetailAccount(destination_account_id);
    if (!destinationAccount) throw new NotFoundError("Destination account not found");

    const updatedDestinationAccount = await ACCOUNT_MODELS.updateIncrementDestinationAccount(data);

    const createTransaction = await TRANSACTION_MODELS.createDeposit(data);

    return createTransaction;
  },

  createWithdraw: async (data) => {
    const { amount, source_account_id } = data;

    const sourceAccount = await ACCOUNT_MODELS.getDetailAccount(source_account_id);
    if (!sourceAccount) throw new NotFoundError("Source account not found");

    if (sourceAccount.balance < amount) throw new BadRequest("Insufficient balance");

    const updateDecrementSourceAccount = await ACCOUNT_MODELS.updateDecrementSourceAccount(data);

    const createTransaction = await TRANSACTION_MODELS.createWithdraw(data);

    return createTransaction;
  },
};

module.exports = TRANSACTION_SERVICES;
