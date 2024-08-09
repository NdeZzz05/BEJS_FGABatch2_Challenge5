const express = require("express");
const router = express.Router();
const USER_ROUTER = require("./user");
const TRANSACTION_ROUTER = require("./transaction");
const ACCOUNT_ROUTER = require("./account");
const AUTH_ROUTER = require("./auth");

router.use("/users", USER_ROUTER);
router.use("/transactions", TRANSACTION_ROUTER);
router.use("/accounts", ACCOUNT_ROUTER);
router.use("/auth", AUTH_ROUTER);

module.exports = router;
