const AUTH_MODELS = require("../models/auth.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AUTH_SERVICES = {
  register: async (data) => {
    const { email } = data;
    const checkEmail = await AUTH_MODELS.checkEmail(email);

    if (checkEmail) {
      throw new Error("Email already exists.");
    }

    const result = await AUTH_MODELS.register(data);
    return result;
  },

  login: async (data) => {
    const { password } = data;
    const result = await AUTH_MODELS.login(data);

    if (!result) {
      throw new Error("User tidak terdaftar");
    }
    const isPasswordMatch = bcrypt.compareSync(password, result.password);
    if (!isPasswordMatch) {
      throw new Error("Email atau password salah");
    }

    const payload_token = {
      id: result.id,
      email: result.email,
    };

    let token = jwt.sign(payload_token, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    return {
      user: payload_token,
      token,
    };
  },
};

module.exports = AUTH_SERVICES;
