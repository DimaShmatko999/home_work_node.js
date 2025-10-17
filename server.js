const express = require('express');
const moment = require('moment');
const path = require("path");
const fs = require("fs/promises");
const app = express();
const PORT = 8001;
const HOST = 'localhost';

app.use(express.json());

const postPath = path.join(__dirname, "post.json");

app.get('/timestamp', (req, res) => {
    res.json({ timestamp: moment().format('YYYY/DD/MM HH:mm:ss') });
});

app.get('/weekday', (req, res) => {
    res.json({ weekday: moment().format('dddd') });
});

app.get("/", (req, res) => {
    res.status(200).json("hello");
});

app.get("/posts", async (req, res) => {
    try {
        const postData = await fs.readFile(postPath, "utf-8");
        const post = JSON.parse(postData);
        const skipParam = req.query.skip;
        const takeParam = req.query.take;
        if (skipParam !== undefined && isNaN(+skipParam)) {
            return res.status(400).json("skip must be a number");
        }
        if (takeParam !== undefined && isNaN(+takeParam)) {
            return res.status(400).json("take must be a number");
        }
        const skip = skipParam ? +skipParam : 0;
        const take = takeParam ? +takeParam : post.length;
        const slicedPosts = post.slice(skip, skip + take);
        res.status(200).json(slicedPosts);
    } catch (error) {
        res.status(500).json({ message: "Failed to read posts" });
    }
});

app.get("/posts/:id", async (req, res) => {
    try {
        const postData = await fs.readFile(postPath, "utf-8");
        const post = JSON.parse(postData);
        const id = +req.params.id;
        if (isNaN(id)) {
            return res.status(400).json("id must be an integer");
        }
        const foundPost = post.find((p) => p.id === id);
        if (!foundPost) {
            return res.status(404).json("post not found");
        }
        res.json(foundPost);
    } catch (error) {
        res.status(500).json({ message: "Failed to read posts" });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { name, description, image } = req.body;
        if (!name || !description || !image) {
            return res.status(422).json({ message: "name, description, and image are required" });
        }

        const postData = await fs.readFile(postPath, "utf-8");
        const posts = JSON.parse(postData);
        const newPost = {
            id: posts.length ? posts[posts.length - 1].id + 1 : 1,
            name,
            description,
            image,
            likes: 0
        };

        posts.push(newPost);
        await fs.writeFile(postPath, JSON.stringify(posts, null, 2));

        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
});