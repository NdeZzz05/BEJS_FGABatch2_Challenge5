var express = require("express");
var router = express.Router();
const V1_ROUTER = require("./api");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.use("/api", V1_ROUTER);

module.exports = router;
