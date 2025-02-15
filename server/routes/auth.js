const express = require('express');
const router = express.Router();
const { signUp, login, otpp, resend , register } = require("../controler/auth.controler");


router.post("/signup",signUp);
router.post("/login",login)
router.post("/authenticate",otpp)
router.post("/resendotp",resend)
router.post("/register",register)


module.exports = router;

