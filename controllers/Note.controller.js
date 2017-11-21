/**
 * Created by JULIEN on 21/11/2017.
 */


'use strict';

/* Dependencies */
const jwt = require('jsonwebtoken');
const sha256 = require('sha256');
const config = require('../config/config');



/* MODELS */
const Mater = require('../models/Mater.model');
const User = require('../models/User.model');


/* UTILS */
const random = require('../utils/random');
const checkToken = require('../utils/checkToken');



module.exports = {
    listNote: function(req,res){
        //TODO: populate on user to have user per mater (later)
        Mater.find().populate('users').then(function(maters){
            if(maters)
                res.json({error:false, maters})
        }).catch(err => console.log(err))
    }
};
