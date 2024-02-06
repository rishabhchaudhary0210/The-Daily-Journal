const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get("/log-in", (req, res)=>{
    res.render("login",{errorMsg:""});
})

router.get("/sign-up", (req, res)=>{
    res.render("signup",{errorMsg:"Incorrect password found please try again"});
})



module.exports = router;