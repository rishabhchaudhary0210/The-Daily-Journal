const mongoose = require("mongoose");

const userSchema = {
    name : {
        type: String, 
        require: true
    }, 
    email : {
        type : String, 
        require: true, 
        unique: true,
    },
    password : {
        type: String, 
        require: true
    },
    blogId : {
        type: [String],
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;