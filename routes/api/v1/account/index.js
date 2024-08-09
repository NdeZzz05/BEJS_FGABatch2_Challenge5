var express = require("express");
var router = express.Router();

const ACCOUNT_CONTROLLER = require("../../../../controllers/account.controller");
const AuthMiddleware = require("../../../../middleware/authentication.middleware");
const { adminAccess } = require("../../../../middleware/authorization.middleware");

router.get("/", AuthMiddleware, adminAccess, ACCOUNT_CONTROLLER.getAllAccount);
router.get("/:id", AuthMiddleware, ACCOUNT_CONTROLLER.getDetailAccount);
router.post("/", ACCOUNT_CONTROLLER.createAccount);
router.put("/:id", ACCOUNT_CONTROLLER.updateAccount);
router.delete("/:id", ACCOUNT_CONTROLLER.deleteAccount);

module.exports = router;
