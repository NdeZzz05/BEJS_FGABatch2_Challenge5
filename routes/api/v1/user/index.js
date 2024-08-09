var express = require("express");
var router = express.Router();

const USER_CONTROLLER = require("../../../../controllers/user.controller");

router.get("/", USER_CONTROLLER.getAllUser);
router.get("/:id", USER_CONTROLLER.getDetailUser);
router.put("/:id", USER_CONTROLLER.updateUser);
router.delete("/:id", USER_CONTROLLER.deleteUser);

module.exports = router;
