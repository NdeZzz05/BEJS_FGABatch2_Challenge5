var express = require("express");
var router = express.Router();

const ACCOUNT_CONTROLLER = require("../../../../controllers/account.controller");
const AuthMiddleware = require("../../../../middleware/authentication.middleware");
const { adminAccess } = require("../../../../middleware/authorization.middleware");

router.get("/", ACCOUNT_CONTROLLER.getAllAccount);
router.get("/:id", AuthMiddleware, ACCOUNT_CONTROLLER.getDetailAccount);
router.post("/", AuthMiddleware, ACCOUNT_CONTROLLER.createAccount);
router.put("/:id", AuthMiddleware, ACCOUNT_CONTROLLER.updateAccount);
router.delete("/:id", AuthMiddleware, adminAccess, ACCOUNT_CONTROLLER.deleteAccount);

module.exports = router;
