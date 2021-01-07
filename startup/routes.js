const express = require('express');
const users = require ('../routes/users');
const companies = require ('../routes/companies');
const auth = require ('../routes/auth');
const authc = require ('../routes/authc');
const error = require('../middleware/error');


module.exports = function (app) {
    
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/companies', companies);
    app.use('/api/auth', auth);
    app.use('/api/authc', authc);

    app.use(error);

    
}