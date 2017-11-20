/**
 * Created by SYLVAIN on 20/11/2017.
 */
'use strict';

/* Dependencies */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const config = require('../config/config');

//very important to get this secret to decode jwt
app.set('superSecret', config.secret); // secret variable  //variable environnement app.get('superSecret');



function checkToken(req, callback) {

    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

    let response_data = {
        message: "",
        error: false
    };

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                response_data = {message: err, error: true};
                callback(response_data);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded; //get all data passé lors de la création du jwt (encodé avant) qui ici sont décodé en objet json
                response_data = {message: token, error: false, user_decoded_from_jwt: decoded};
                callback(response_data);
            }
        });
    } else {
        console.log("Pas de token");
        // if there is no token
        // return an error
        response_data = {message: "No token provided !", error: true};
        callback(response_data);
    }
}


module.exports = checkToken;
