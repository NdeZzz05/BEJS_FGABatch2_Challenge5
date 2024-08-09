var express = require("express");
var router = express.Router();

const USER_CONTROLLER = require("../../../../controllers/user.controller");
const AuthMiddleware = require("../../../../middleware/authentication.middleware");

router.get("/", AuthMiddleware, USER_CONTROLLER.getAllUser);
router.get("/:id", AuthMiddleware, USER_CONTROLLER.getDetailUser);
router.put("/:id", AuthMiddleware, USER_CONTROLLER.updateUser);
router.delete("/:id", AuthMiddleware, USER_CONTROLLER.deleteUser);

module.exports = router;
