const { BadRequest } = require("../errors/customsErrors");
const TRANSACTION_SERVICES = require("../services/transaction.services");
const VALIDATION_TRANSACTION = require("../validation/transaction.validation");

getAllTransaction = async (req, res, next) => {
  try {
    const result = await TRANSACTION_SERVICES.getAllTransaction(req.query);
    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

getDetailTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await TRANSACTION_SERVICES.getDetailTransaction(id);
    res.status(200).json({
      success: true,
      message: "Detail transactions fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createTransfer = async (req, res, next) => {
  try {
    const { error, value } = VALIDATION_TRANSACTION.createTransfer(req.body);

    if (error) throw new BadRequest(error.details[0].message);

    const result = await TRANSACTION_SERVICES.createTransfer(value);

    res.status(201).json({
      success: true,
      message: "Transfer created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createDeposit = async (req, res, next) => {
  try {
    const { error, value } = VALIDATION_TRANSACTION.createDeposit(req.body);

    if (error) throw new BadRequest(error.details[0].message);

    const result = await TRANSACTION_SERVICES.createDeposit(value);

    res.status(201).json({
      success: true,
      message: "Cash deposit created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createWithdraw = async (req, res, next) => {
  try {
    const { error, value } = VALIDATION_TRANSACTION.createWithdraw(req.body);

    if (error) throw new BadRequest(error.details[0].message);

    const result = await TRANSACTION_SERVICES.createWithdraw(value);

    res.status(201).json({
      success: true,
      message: "Cash withdrawal created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTransaction, getDetailTransaction, createTransfer, createDeposit, createWithdraw };
