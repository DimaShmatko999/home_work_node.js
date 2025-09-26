const express = require('express');
const moment = require('moment');
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 8001;
const HOST = 'localhost';
const postPath = path.join(__dirname, "post.json");
const post = JSON.parse(fs.readFileSync(postPath, "utf-8"));

app.get('/timestamp', (req, res) => {
    res.json({ timestamp: moment().format('YYYY/DD/MM HH:mm:ss') });
});

app.get('/weekday', (req, res) => {
    res.json({ weekday: moment().format('dddd') });
});

app.get("/", (req, res) => {
    res.status(200).json("hello");
});

app.get("/posts", (req, res) => {
    const skipParam = req.query.skip;
    const takeParam = req.query.take;
    if (skipParam !== undefined && isNaN(+skipParam)) {
        res.status(400).json("skip must be a number");
        return;
    }
    if (takeParam !== undefined && isNaN(+takeParam)) {
        res.status(400).json("take must be a number");
        return;
    }
    const skip = skipParam ? +skipParam : 0;
    const take = takeParam ? +takeParam : post.length;
    const slicedPosts = post.slice(skip, skip + take);
    res.status(200).json(slicedPosts);
});

app.get("/posts/:id", (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        res.status(400).json("id must be an integer");
        return;
    }
    const foundPost = post.find((pr) => {
        const isMatch = pr.id === id;
        return isMatch;
    });
    if (!foundPost) {
        res.status(404).json("post not found");
        return;
    }
    res.json(foundPost);
});

app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});