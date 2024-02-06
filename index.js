const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const path = require("path");
const Post = require("./model/postSchema.js");

const morgan = require('morgan');

require('dotenv').config();

const port = process.env.PORT || 80;
const app = express();
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, '/views'));
app.set("view engine", "ejs");

mongoose.set("strictQuery", true);
try {
    mongoose.connect(process.env.DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'dailyjournal'
    },
    );
} catch (err) {
    console.log(process.env.DBURL)
    console.log(err);
}
mongoose.connection.on("error", (err) => {
    console.log("Error in Connection");
    console.log(err);
})
mongoose.connection.once("open", () => {
    console.log("SuccessFully Connected TO the DB");
})

const homeContent = "=>HOME CONTENT<=Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem veritatis ducimus alias cumque quibusdam perspiciatis possimus facilis ipsum mollitia iste doloribus quaerat ea reiciendis illum unde fuga maiores ab, laborum tempore culpa excepturi";




app.get("/", (req, res) => {
    Post.find((err, items) => {
        if (!err) {
            res.render("home", { homeLorem: homeContent, texts: items });
        } else {
            console.log(err);
            res.status(500).render("home", { homeLorem: "Error Connecting to DB" });
        }
    });

});
app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/contact", (req, res) => {
    res.render("contact");
});

app.use("/blog", require("./routes/Blog.js"));
app.use("/user", require("./routes/User.js"));

app.get("/test", (req, res) => {
    res.json({ 'Test': 'App' });
})



app.listen(port, () => {
    console.log(`Server started at port : ${port}`);
});
