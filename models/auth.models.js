const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

const AUTH_MODELS = {
  checkEmail: async (email) => {
    const result = await prisma.users.findUnique({
      where: { email },
    });

    return result;
  },

  register: async (data) => {
    const { name, email, password, role } = data;

    // Encrypt the password
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const result = await prisma.users.create({
      data: {
        name,
        email,
        password: encryptedPassword,
        role,
      },
    });
    return result;
  },

  login: async (data) => {
    const { email } = data;
    const result = await prisma.users.findUnique({
      where: { email },
    });
    return result;
  },
};

module.exports = AUTH_MODELS;
