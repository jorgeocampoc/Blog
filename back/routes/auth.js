var express = require("express");
var router = express.Router();

const { auth } = require("../controller/auth");

router.post("/", auth);

module.exports = router;
