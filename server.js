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

app.get('/posts', (req, res) => {
    res.status(200).json(post);
});

app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`)
})