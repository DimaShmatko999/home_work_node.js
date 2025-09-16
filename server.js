const express = require('express');
const moment = require('moment');

const app = express();
const PORT = 3000;

app.get('/timestamp', (req, res) => {
    res.json({ timestamp: moment().format('YYYY/DD/MM HH:mm:ss') });
});

app.get('/weekday', (req, res) => {
    res.json({ weekday: moment().format('dddd') });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});