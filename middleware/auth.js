const jwt = require("jsonwebtoken");
require('dotenv').config();

const isAuth =  (req, res, next)=>{
    const token = req.cookies.jwt;
    console.log("toke = ", token);
    const checkToken = jwt.verify(token, process.env.JWT_SECRET, async (err, decoded)=>{
        if(err){
            // alert("Log-in required. Please login to proceed")
            return res.render('login', {errorMsg:"Log-In required"})
        }
        // return res.status(200).json({success:'User Logged In Successfully', user:decoded});
        //login - success
        next()
    });
}

module.exports = isAuth;