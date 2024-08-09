var express = require("express");
var router = express.Router();

const AUTH_CONTROLLER = require("../../../../controllers/auth.controller");
const passport = require("passport");

router.post("/register", AUTH_CONTROLLER.postRegister);

router.post("/login", AUTH_CONTROLLER.login);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/redirect", session: false }), AUTH_CONTROLLER.LoginWithGoogle);

module.exports = router;
