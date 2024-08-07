const { NotFoundError, BadRequest } = require("../errors/customsErrors");
const USER_MODELS = require("../models/user.models");

const USER_SERVICES = {
  getAllUser: async (data) => {
    const { name } = data;

    const where = {};
    if (name) {
      where.name = { contains: name, mode: "insensitive" }; // 'contains' digunakan untuk pencarian parsial, 'mode: insensitive' untuk pencarian case-insensitive
    }
    const result = await USER_MODELS.getAllUser(where);
    return result;
  },

  getDetailUser: async (id) => {
    const result = await USER_MODELS.getDetailUser(id);

    if (!result) {
      throw new NotFoundError("User not found");
    }

    return result;
  },

  createUser: async (data) => {
    try {
      const result = await USER_MODELS.createUser(data);
      return result;
    } catch (error) {
      if (error.code === "P2002" && error.meta.target.includes("email")) {
        throw new BadRequest("Email already exists");
      } else if (error.code === "P2002" && error.meta.target.includes("identity_number")) {
        throw new BadRequest("Identity number already exists");
      }

      return error;
    }
  },

  updateUser: async (id, data) => {
    try {
      const result = await USER_MODELS.updateUser(id, data);

      return result;
    } catch (error) {
      if (error.code === "P2002" && error.meta.target.includes("email")) {
        throw new BadRequest("Email already exists");
      } else if (error.code === "P2002" && error.meta.target.includes("identity_number")) {
        throw new BadRequest("Identity number already exists");
      } else if (error.code === "P2025") {
        throw new NotFoundError("User not found");
      }

      return error;
    }
  },

  deleteUser: async (id) => {
    const checkUser = await USER_MODELS.getDetailUser(id);

    if (!checkUser) {
      throw new NotFoundError("User not found");
    }

    try {
      const result = await USER_MODELS.deleteUser(id);
      return result;
    } catch (error) {
      return error;
    }
  },
};

module.exports = USER_SERVICES;
