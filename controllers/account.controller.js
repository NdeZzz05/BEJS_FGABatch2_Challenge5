const { BadRequest } = require("../errors/customsErrors");
const ACCOUNT_SERVICES = require("../services/account.services");
const VALIDATION_ACCOUNT = require("../validation/account.validation");

getAllAccount = async (req, res, next) => {
  try {
    const result = await ACCOUNT_SERVICES.getAllAccount(req.query);
    res.status(200).json({
      success: true,
      message: "All bank accounts fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

getDetailAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await ACCOUNT_SERVICES.getDetailAccount(id);

    res.status(200).json({
      success: true,
      message: "Detail bank account fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createAccount = async (req, res, next) => {
  try {
    const { error, value } = VALIDATION_ACCOUNT.createAccountValidation(req.body);

    if (error) throw new BadRequest(error.details[0].message);

    const result = await ACCOUNT_SERVICES.createAccount(value);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

updateAccount = async (req, res, next) => {
  try {
    const { error, value } = VALIDATION_ACCOUNT.updateAccountValidation(req.body);

    if (error) throw new BadRequest(error.details[0].message);

    const { id } = req.params;
    const result = await ACCOUNT_SERVICES.updateAccount(id, value);

    res.status(200).json({
      success: true,
      message: "Account updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await ACCOUNT_SERVICES.deleteAccount(id);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAccount, getDetailAccount, createAccount, updateAccount, deleteAccount };
