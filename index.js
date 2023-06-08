const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const path = require("path");

require('dotenv').config();

const port = process.env.PORT || 80;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("views", path.join(__dirname, '/views'));
app.set("view engine","ejs");

// mongoose.connect("mongodb://127.0.0.1:27017/blogsDB");

mongoose.set("strictQuery",true);
mongoose.connect(process.env.DBURL,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    },(err)=>{
        err ? console.log("Error in Connection" + err) : console.log("SuccessFully Connected with DB");
    }
);


const homeContent = "=>HOME CONTENT<=Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem veritatis ducimus alias cumque quibusdam perspiciatis possimus facilis ipsum mollitia iste doloribus quaerat ea reiciendis illum unde fuga maiores ab, laborum tempore culpa excepturi" ;
const aboutContent = "=>ABOUT CONTENT<=Lorem ipsum dolor sit amet consectetur adipisicing elit. Est placeat ea facilis ad eius doloremque, expedita delectus voluptates, consequatur consectetur dolor vitae corporis mollitia dolores quos maxime, atque laboriosam.";
const contactContent = "=>CONTACT CONTENT<=Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae numquam quas voluptas fugit soluta obcaecati quam sequi reprehenderit quidem quos est eum veniam ut, nisi nemo ipsa. Nobis, voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius animi libero amet!";

const postSchema = {
    name:String,
    text:String
};
const Post = mongoose.model("Post",postSchema);

app.get("/",(req,res)=>{
    Post.find((err,items)=>{
        if(!err){
            // console.log(items);
            res.render("home",{homeLorem:homeContent, texts:items});
        }
    });
});
app.get("/about",(req,res)=>{
    res.render("about",{aboutLorem:aboutContent});
});
app.get("/contact",(req,res)=>{
    res.render("contact",{contactLorem:contactContent});
});
app.get("/compose",(req,res)=>{
    res.render("compose");
});
app.post("/compose",(req,res)=>{
    const newBlog = new Post({
        name:_.upperFirst(req.body.newTitle),
        text:req.body.newPost
    });
    newBlog.save((err)=>{
        if(!err){
            res.redirect("/");
        }
    });
});

app.get("/posts/:topic",(req,res)=>{
    Post.findOne({_id:(req.params.topic)},(err,result)=>{
        if(!err){
            if(result){
                // console.log(result);
                console.log("Match Found!");
                res.render("post",{postTitle:result.name, postText:result.text});
            }
        }
    })
});

app.get("/test",(req,res)=>{
    res.json({'Test':'App'});
})

app.post("/delete",(req,res)=>{
    const deletePost = req.body.deletePost
    Post.deleteOne({_id:deletePost},(err)=>{
        if(!err){
            console.log("Successfully Removed Post");
            res.redirect("/");
        }
    })
});

app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
});