var express = require("express");
var router = express.Router();

const AUTH_CONTROLLER = require("../../../../../controllers/auth.controller");
const AuthMiddleware = require("../../../../../middleware/authentication.middleware");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("register.ejs", { message: {} });
});
router.post("/register", AUTH_CONTROLLER.postRegister);

router.post("/login", AUTH_CONTROLLER.postLogin);
router.get("/whoami", AuthMiddleware, AUTH_CONTROLLER.whoami);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/redirect", session: false }), AUTH_CONTROLLER.LoginWithGoogle);

module.exports = router;
