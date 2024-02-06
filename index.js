const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const Post = require("./model/postSchema.js");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');

require('dotenv').config();

const port = process.env.PORT || 80;
const app = express();
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, '/views'));
app.set("view engine", "ejs");
app.use(cookieParser());


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



app.get("/", (req, res) => {
    console.log(req.cookies)
    Post.find((err, items) => {
        if (!err) {
            res.render("home", {texts: items });
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
