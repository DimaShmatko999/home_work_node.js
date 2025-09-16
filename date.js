const moment = require('moment');

function getDate() {
    const now = moment();
    const formatted = now.format('YYYY/DD/MM HH:mm:ss');
    console.log(formatted);
}

function getCurrentWeekday() {
    const now = moment();
    const weekday = now.format('dddd');
    console.log(`Сегодня: ${weekday}`);
}

module.exports = {
    getDate,
    getCurrentWeekday
};