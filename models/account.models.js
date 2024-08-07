const prisma = require("../config/prisma");
const generateAccountNumber = require("../utils/generate_account_number");

const ACCOUNT_MODELS = {
  getAllAccount: async (where) => {
    const result = await prisma.bank_Accounts.findMany({
      where,
      select: {
        id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        user_id: true,
      },
    });
    return result;
  },

  getDetailAccount: async (id) => {
    const result = await prisma.bank_Accounts.findUnique({
      where: { id },
      select: {
        id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        user_id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        transactions_source: true,
        transactions_target: true,
      },
    });
    return result;
  },

  createAccount: async (data) => {
    const { bank_name, pin, balance, user_id } = data;

    const newAccountNumber = await generateAccountNumber();

    const result = await prisma.bank_Accounts.create({
      data: {
        bank_name,
        bank_account_number: newAccountNumber,
        pin,
        balance,
        user_id,
      },
    });

    return result;
  },

  updateAccount: async (id, data) => {
    const { bank_name, pin } = data;

    const result = await prisma.bank_Accounts.update({
      where: { id },
      data: {
        bank_name,
        pin,
      },
    });
    return result;
  },

  deleteAccount: async (id) => {
    const result = await prisma.bank_Accounts.delete({ where: { id } });
    return result;
  },

  updateDecrementSourceAccount: async (data) => {
    const { source_account_id, amount } = data;
    const result = await prisma.bank_Accounts.update({
      where: { id: source_account_id },
      data: { balance: { decrement: amount } },
    });
    return result;
  },

  updateIncrementDestinationAccount: async (data) => {
    const { destination_account_id, amount } = data;
    const result = await prisma.bank_Accounts.update({
      where: { id: destination_account_id },
      data: { balance: { increment: amount } },
    });
    return result;
  },
};

module.exports = ACCOUNT_MODELS;
