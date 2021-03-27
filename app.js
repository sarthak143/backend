const express = require("express");
const mongoose = require('mongoose');

const bodyParser = require("body-parser");
const Post = require("./models/post")
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect('mongodb+srv://sarthak:darapstar786.@cluster0.rw2cb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    { useUnifiedTopology: true })
    .then(() => {
        console.log("coonected to mongo");
    })
    .catch(() => {
        console.log("connection failed");
    });


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save(); // mongoose cmd to save data in collection named model name(post) + s = posts
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get("/api/posts", (req, res, next) => {
    Post.find().then(
        documents => {
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: documents
            });
        }
    )

});
app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!" });
    });
});

module.exports = app;
