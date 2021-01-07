const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
      type:String,
      required: true,
      minlength: 5,
      maxlength: 50

    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1025
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1025
    },
    state: {
        type: String,
        required: true
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}


const User =  mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        fullName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(5).max(50).required(),
        address: Joi.string().min(10).max(255).required(),
        state: Joi.string().required()
    });
    return schema.validate(user);
  
};

exports.User = User;
exports.validate = validateUser; 