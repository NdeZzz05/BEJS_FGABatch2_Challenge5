var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const INDEX_ROUTES = require("./routes/index");
const ERROR_HANDLER = require("./middleware/errorHandling");
const NOT_FOUND_HANDLER = require("./middleware/notFoundHandling");
const cors = require("cors");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(INDEX_ROUTES);
app.use(NOT_FOUND_HANDLER);
app.use(ERROR_HANDLER);

module.exports = app;
