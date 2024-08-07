const prisma = require("../config/prisma");

const TRANSACTION_MODELS = {
  getAllTransaction: async (where) => {
    const result = await prisma.transactions.findMany({
      where,
      include: {
        transaction_type: true,
      },
    });
    return result;
  },

  getDetailTransaction: async (id) => {
    const result = await prisma.transactions.findUnique({
      where: { id },
      include: {
        transaction_type: true,
        sourceAccount: true,
        destinationAccount: true,
      },
    });

    return result;
  },

  createTransfer: async (data) => {
    const { amount, source_account_id, destination_account_id, transaction_type_id } = data;

    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (prisma) => {
      const transaction = await prisma.transactions.create({
        data: {
          amount,
          source_account_id,
          destination_account_id,
          transaction_type_id,
        },
      });

      return transaction;
    });

    return result;
  },

  createDeposit: async (data) => {
    const { amount, destination_account_id, transaction_type_id } = data;
    const result = await prisma.$transaction(async (prisma) => {
      const transaction = await prisma.transactions.create({
        data: {
          amount,
          source_account_id: null, // Tidak ada akun sumber untuk setoran tunai
          destination_account_id,
          transaction_type_id,
        },
      });
      return transaction;
    });
    return result;
  },

  createWithdraw: async (data) => {
    const { amount, source_account_id, transaction_type_id } = data;
    const result = await prisma.$transaction(async (prisma) => {
      const transaction = await prisma.transactions.create({
        data: {
          amount,
          source_account_id,
          destination_account_id: null, // Tidak ada akun tujuan pengambilan tunai
          transaction_type_id,
        },
      });
      return transaction;
    });
    return result;
  },
};

module.exports = TRANSACTION_MODELS;
