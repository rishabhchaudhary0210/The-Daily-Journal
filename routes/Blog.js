const express = require("express");
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken")
const isAuth = require('./../middleware/auth.js')
const Post = require("./../model/postSchema.js");
const User = require("../model/userSchema.js");

router.get("/compose", isAuth, (req, res) => {
    res.render("compose");
});

router.post("/compose", isAuth, async (req, res) => {
    try{
        const userid = jwt.decode(req.cookies.jwt)._id;
        const newBlog = await Post.create({
            name: _.upperFirst(req.body.newTitle),
            text: req.body.newPost,
            userId : userid
        });
        if(userid){
            const temp = await User.findOneAndUpdate({_id:userid},{$push:{blogId:newBlog._id}});
            // console.log(newBlog, temp);
        }
        res.redirect(`/blog/posts/${newBlog._id}`);
    }
    catch(err){
        console.log(err);
        res.redirect("/blog/compose");
    }
});


router.get("/posts/:topic", (req, res) => {
    Post.findOne({ _id: (req.params.topic) }, (err, result) => {
        if (!err) {
            if (result) {
                return res.render("post", { postTitle: result.name, postText: result.text });
            }
        }
        return res.redirect("/");
    })
});

router.get("/dashboard", isAuth, async (req, res)=>{
    try{
        const userId = jwt.decode(req.cookies.jwt)._id;
        const user = await User.findOne({_id: userId});
        const {blogId} = user;
        console.log("user =  ", user);
        
        const blogPosts = await Post.find({ _id: { $in: blogId } });
        console.log("vlogpost = ", blogPosts);
        return res.render("dashboard", {texts: blogPosts});
    }
    catch(err){
        console.log(err);
        res.redirect("/");
    }
})

router.get("/edit/:topic", isAuth, (req, res) => {
    Post.findOne({ _id: (req.params.topic) }, (err, result) => {
        if (!err) {
            if (result) {
                console.log("Match Found!");
                res.render("edit", { postId: result._id, postTitle: result.name, postText: result.text });
            }
        }
    })
});

router.post("/update", isAuth, (req, res) => {
    Post.findByIdAndUpdate({ _id: req.body.updatePost }, { name: req.body.newTitle, text: req.body.newPost }, (err) => {
        if (!err) {
            console.log("SuccessFully Updated");
            res.redirect(`/blog/posts/${req.body.updatePost}`);
        }
    })
})

router.post("/delete", isAuth, (req, res) => {
    const deletePost = req.body.deletePost;
    Post.deleteOne({ _id: deletePost }, (err) => {
        if (!err) {
            console.log("Successfully Removed Post");
            res.redirect("/blog/dashboard");
        }
    })
});

module.exports = router;