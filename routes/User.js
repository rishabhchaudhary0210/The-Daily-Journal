const express = require("express");
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require("./../model/userSchema.js");

router.get("/log-in", (req, res)=>{
    res.render("login",{errorMsg:""});
})

router.get("/sign-up", (req, res)=>{
    res.render("signup",{errorMsg:""});
})

router.post('/sign-up', async (req, res) => {
    const { name, email, password } = req.body;
    console.log("Req");
    try {
        let user = await User.findOne({ email });
        if(user){
            return res.render("signup",{errorMsg:"Email already registred. Try logging-in."});
        }
        const hashedPass = await bcrypt.hash(password, 12);
        user = await User.create({
            name:name,
            email: email,
            password: hashedPass,
            blogId: [],
        })
        const payload = { _id: user._id, name:user.name }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:3*24*60*60 });

        console.log(user);
        console.log(token);
        // res.cookie('jwt',token, {maxAge:3*24*60*60*1000,httpOnly:true}).status(200).json({success:'Signed Up Successfully', user:payload, token:token});
        //figure out jwt credentials
        res.cookie('jwt',token, {maxAge:3*24*60*60*1000,httpOnly:true}).redirect("/");
    }
    catch (err) {
        console.log(err);
        res.render("signup",{errorMsg:"Internal Server Error. Please try again."});
    }
})

router.post('/log-in', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.render("login",{errorMsg: 'Invalid Credentials. Please try Again' });
        }
        let passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.render("login",{errorMsg: 'Invalid Credentials. Please try Again' });
        }

        //figure out jwt here
        const payload = {_id:user._id, name:user.name};
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:3*24*60*60 });
        // res.cookie('jwt',token,{maxAge:3*24*60*60*1000,httpOnly:true}).status(200).json({success:'Logged In Successfully', user:payload, token:token});
        res.cookie('jwt',token,{maxAge:3*24*60*60*1000,httpOnly:true}).redirect("/");
    }
    catch (err) {
        console.log(err);
        res.render("login",{errorMsg:"Internal Server Error"});
    }
})

router.get('/log-out',(req, res)=>{
    return res.clearCookie('jwt').redirect("/");
})



module.exports = router;