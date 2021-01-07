
const Joi = require('joi');
const bcrypt = require ('bcrypt');
const _ = require('lodash');
const {Company} = require('../models/company');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {
    const { error } = validate(req.body); // result.error
    if (error)  return  res.status(400).send(error.details[0].message);

    let company = await Company.findOne({ email: req.body.email });
    if (!company) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, company.password)
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = company.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
  
    });
    return schema.validate(req);

};
module.exports = router;