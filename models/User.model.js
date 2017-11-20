/**
 * Created by SYLVAIN on 20/11/2017.
 */

'use strict';


// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    salt: String,
    email: String,
    date_registration: Date,
});

module.exports = mongoose.model('User', userSchema);
