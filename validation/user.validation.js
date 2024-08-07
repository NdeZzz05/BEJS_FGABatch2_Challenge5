const JOI = require("joi");

const createUserValidation = (payload) => {
  const schema = JOI.object({
    name: JOI.string().required(),
    email: JOI.string().email().required(),
    password: JOI.string().min(8).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*])")).required().messages({
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
    identity_type: JOI.string().required(),
    identity_number: JOI.string().required(),
    street: JOI.string().required(),
    city: JOI.string().required(),
    state: JOI.string().required(),
    postal_code: JOI.string().required(),
    country: JOI.string().required(),
    company_name: JOI.string().required(),
    position: JOI.string().required(),
  });

  return schema.validate(payload);
};

module.exports = createUserValidation;
