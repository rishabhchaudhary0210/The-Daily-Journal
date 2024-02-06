const mongoose = require("mongoose");

const postSchema = {
    name: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
    user: {
        type: String,
        require: true,
    }
};
const Post = mongoose.model("Post", postSchema);

module.exports = Post;