const express = require("express");
const router = express.Router();

const Post = require("./../model/postSchema.js");

router.get("/compose", (req, res) => {
    res.render("compose");
});

router.post("/compose", (req, res) => {
    const newBlog = new Post({
        name: _.upperFirst(req.body.newTitle),
        text: req.body.newPost
    });
    newBlog.save((err) => {
        if (!err) {
            res.redirect("/");
        }
    }
    );
});

router.get("/posts/:topic", (req, res) => {
    Post.findOne({ _id: (req.params.topic) }, (err, result) => {
        if (!err) {
            if (result) {
                console.log("Match Found!");
                res.render("post", { postTitle: result.name, postText: result.text });
            }
        }
    })
});

router.get("/edit/:topic", (req, res) => {
    Post.findOne({ _id: (req.params.topic) }, (err, result) => {
        if (!err) {
            if (result) {
                console.log("Match Found!");
                res.render("edit", { postId: result._id, postTitle: result.name, postText: result.text });
            }
        }
    })
});

router.post("/update", (req, res) => {
    Post.findByIdAndUpdate({ _id: req.body.updatePost }, { name: req.body.newTitle, text: req.body.newPost }, (err) => {
        if (!err) {
            console.log("SuccessFully Updated");
            res.redirect("/");
        }
    })
})

router.post("/delete", (req, res) => {
    const deletePost = req.body.deletePost;
    Post.deleteOne({ _id: deletePost }, (err) => {
        if (!err) {
            console.log("Successfully Removed Post");
            res.redirect("/");
        }
    })
});

module.exports = router;