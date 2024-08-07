const JOI = require("joi");

const VALIDATION_TRANSACTION = {
  createTransfer: (payload) => {
    const schema = JOI.object({
      amount: JOI.number().positive().greater(0).required(),
      source_account_id: JOI.string().required(),
      destination_account_id: JOI.string().required(),
      transaction_type_id: JOI.string().required(),
    });
    return schema.validate(payload);
  },

  createDeposit: (payload) => {
    const schema = JOI.object({
      amount: JOI.number().positive().greater(0).required(),
      destination_account_id: JOI.string().required(),
      transaction_type_id: JOI.string().required(),
    });
    return schema.validate(payload);
  },

  createWithdraw: (payload) => {
    const schema = JOI.object({
      amount: JOI.number().positive().greater(0).required(),
      source_account_id: JOI.string().required(),
      transaction_type_id: JOI.string().required(),
    });
    return schema.validate(payload);
  },
};

module.exports = VALIDATION_TRANSACTION;
