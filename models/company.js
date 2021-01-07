const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
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

companySchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}


const Company =  mongoose.model('Company', companySchema);

function validateCompany(company) {
    const schema = Joi.object({
        companyName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(5).max(50).required(),
        address: Joi.string().min(10).max(255).required(),
        state: Joi.string().required()
    });
    return schema.validate(company);  
};

exports.Company = Company;
exports.validate = validateCompany; 