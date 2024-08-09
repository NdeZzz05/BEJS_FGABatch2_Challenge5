var express = require("express");
var router = express.Router();

const TRANSACTION_CONTROLLER = require("../../../../controllers/transaction.controller");
const AuthMiddleware = require("../../../../middleware/authentication.middleware");

router.get("/", AuthMiddleware, TRANSACTION_CONTROLLER.getAllTransaction);
router.get("/:id", AuthMiddleware, TRANSACTION_CONTROLLER.getDetailTransaction);
router.post("/transfer", AuthMiddleware, TRANSACTION_CONTROLLER.createTransfer);
router.post("/deposit", AuthMiddleware, TRANSACTION_CONTROLLER.createDeposit);
router.post("/withdraw", AuthMiddleware, TRANSACTION_CONTROLLER.createWithdraw);

module.exports = router;
