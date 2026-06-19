const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/register", register); // المسار الجديد اتضاف هنا

module.exports = router;