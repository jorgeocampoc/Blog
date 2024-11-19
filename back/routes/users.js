var express = require("express");
var router = express.Router();

const { getUsers,registerUser } = require("../controller/users");

router.get("/", getUsers);
router.post("/", registerUser);

module.exports = router;
