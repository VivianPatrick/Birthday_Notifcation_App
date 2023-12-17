const joi = require('joi');
const User = require('../model/UserModel');

const validateRegister = async (req, res, next) => {
    const schema = joi.object({
        username: joi.string().required().min(3).max(30).messages({
            'string.base': `username should be a type of 'text'`,
            'string.empty': `username cannot be an empty field`,
            'string.min': `username should have a minimum length of {#limit}`,
            'string.max': `username should have a maximum length of {#limit}`,
            'any.required': `username is a required field`
        }),
        email: joi.string().required().email().messages({
            'string.base': `email should be a type of 'text'`,
            'string.empty': `email cannot be an empty field`,
            'string.email': `email format is invalid`,
            'any.required': `email is a required field`
        }),
        birthday: joi.date().required().messages({
            'date.base': `birthday should be a type of 'date'`,
            'date.empty': `birthday cannot be an empty field`,
            'date.min': `birthday should have a minimum length of {#limit}`,
            'date.max': `birthday should have a maximum length of {#limit}`,
            'any.required': `birthday is a required field`
        })
    })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
    next();
}

module.exports = { validateRegister }