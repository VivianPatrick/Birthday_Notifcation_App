const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();

const userSchema = new schema({
    _id: {
        type: String,
        default: () => uid.randomUUID(6)
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    birthday: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;