const express = require("express");
const { createAccount, deposit, withdraw } = require("../controller/bankController");

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);


module.exports = router;

