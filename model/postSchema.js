const mongoose = require("mongoose");

const postSchema = {
    name: String,
    text: String
};
const Post = mongoose.model("Post", postSchema);

module.exports = Post;