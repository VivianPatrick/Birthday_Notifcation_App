const userSchema = require('../model/UserModel');
const sendEmail = require('../utils/email');

const register = async (req, res) => {
    const {username, email, birthday} = req.body;
    try {
        const existingUser = await userSchema.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'User already exists'});
        }

        const user = await userSchema.create({
            username,
            email,
            birthday
        })
        const message = `Hi ${user.username}, Happy birthday in advance. It's nice having you here!!!`;
        sendEmail(message, user);
        return res.status(200).json({
            status: 'success',
            message: 'User created successfully'
            // data: user
        })
} catch (error) {
    return res.status(500).json({
        status: 'error',
        message: error.message
    })
}
};


module.exports = {register}