const nodeMailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (message, user) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: 'Greetings from our team',
            text: message
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(' Email error: ', error);
    }
};

module.exports = sendEmail;