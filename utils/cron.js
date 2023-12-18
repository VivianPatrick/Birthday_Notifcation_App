const cron = require('node-cron');
const User = require('../model/UserModel');
const sendEmail = require('../utils/email');

function start(){
    console.log('Cron job started');
    cron.schedule('0 0 * * *', async () => {

        const today = new Date();
        const monthDay = today.toISOString().slice(5,10);
        console.log(monthDay);
        const users = await User.find({birthdayMD: {$eq: monthDay}});

        const message = `Happy birthday ${users[0].username}. We wish you a wonderful birthday celebration!!!`;
        users.forEach(user => {
            sendEmail(message, user);
        });

});
}

module.exports = {start};