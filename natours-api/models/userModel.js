const mongoose = require('mongoose');
const validateEmail = require('../utils/validateEmail');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: "First Name cannot be empty!"
    },
    last_name: {
        type: String,
        required: "Last Name cannot be empty!"
    },
    username: {
        type: String,
        required: "Username cannot be empty!",
        unique: true,
        trim: true,
        minLength: 4,
        maxLength: 12
    },
    password: {
        type: String,
        required: "Password cannot be empty!",
        minLength: 6
    },
    passwordConfirm: {
        type: String,
        required: "Password confirm cannot be empty!",
        validate: {
            validator: function(value) {
                return value === this.password;
            },
            message: "Password must be equal."
        }
    },
    email: {
        type: String,
        validate: [validateEmail, "Email not correct!"],
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: {
        type: String
    }
});

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;