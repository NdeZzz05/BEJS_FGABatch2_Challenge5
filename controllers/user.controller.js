const { BadRequest } = require("../errors/customsErrors");
const USER_SERVICES = require("../services/user.services");
const createUserValidation = require("../validation/user.validation");

getAllUser = async (req, res, next) => {
  try {
    const result = await USER_SERVICES.getAllUser(req.query);
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

getDetailUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await USER_SERVICES.getDetailUser(id);
    res.status(200).json({
      success: true,
      message: "User found successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createUser = async (req, res, next) => {
  try {
    const { error, value } = createUserValidation(req.body);

    if (error) throw new BadRequest(error.details[0].message);

    const result = await USER_SERVICES.createUser(value);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

updateUser = async (req, res, next) => {
  try {
    const { error, value } = createUserValidation(req.body);

    if (error) throw new BadRequest(error.details[0].message);

    const { id } = req.params;
    const result = await USER_SERVICES.updateUser(id, value);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await USER_SERVICES.deleteUser(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUser, getDetailUser, createUser, updateUser, deleteUser };
