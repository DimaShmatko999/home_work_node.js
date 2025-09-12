const moment = require('moment');

function getDate() {
    const now = moment();
    const formatted = now.format('YYYY/DD/MM HH:mm:ss');
    console.log(formatted);
}

module.exports = { getDate };