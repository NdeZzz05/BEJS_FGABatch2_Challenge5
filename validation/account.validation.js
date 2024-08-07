const JOI = require("joi");

const VALIDATION_ACCOUNT = {
  createAccountValidation: (payload) => {
    const schema = JOI.object({
      bank_name: JOI.string().required(),
      pin: JOI.string().length(6).required(),
      user_id: JOI.string().required(),
      balance: JOI.number().default(0),
    });

    return schema.validate(payload);
  },

  updateAccountValidation: (payload) => {
    const schema = JOI.object({
      bank_name: JOI.string(),
      pin: JOI.string().length(6),
    });

    return schema.validate(payload);
  },
};

module.exports = VALIDATION_ACCOUNT;
