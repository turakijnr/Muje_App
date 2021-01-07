const authc = require ('../middleware/authc'); // authorization
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Company, validate} = require('../models/company');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me',authc, async (req, res) =>{
    
    const company = await Company.findById(req.company._id).select('-password');
    res.send(company);


});

router.post('/', async (req,res) => {
    const { error } = validate(req.body); // result.error
    if (error)  return  res.status(400).send(error.details[0].message);

    let company = await Company.findOne({ email: req.body.email });
    if (company) return res.status(400).send('Company already registered.');
    company = new Company(_.pick(req.body, ['companyName','email','password', 'address', 'state', 'phone']));
    const salt = await bcrypt.genSalt(10);
    company.password = await bcrypt.hash(company.password, salt);
    await company.save();

    const token = company.generateAuthToken();  
    res.header('x-auth-token', token).send(_.pick(company, ['_id','name','email']));
    
});


module.exports = router;