'use strict';

/* server dependencies */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

/* DB */
const mongoose = require('mongoose');
/* DB conf */
const config = require('./config/config');

/* JWT */
const jwt = require('jsonwebtoken');

/* UTILS */
const sha256 = require('sha256');


// /* MODELS */
const UserModel = require('./models/User.model');


// /* CONTROLLER */
const UserCtrl = require('./controllers/User.controller');


/* server instanciate and config router */
const api = express();
api.use(cookieParser()); // cookie manager

//db connection
api.set('superSecret', config.secret); // secret variable  //variable environnement app.get('superSecret');
mongoose.connect(config.database,  { useMongoClient: true }); // connect to database

//get params / body on route /api/*
api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

// DEBUG for console
api.use(morgan('dev'));



// ROUTE

//test
api.get('/',function(req,res){
    res.send("Bonjour");
});

/* REGISTRATION */
api.post('/user/add', function(req,res){
    UserCtrl.addUser(req,res);
});

api.get('/user/logout', function(req,res){
    UserCtrl.logoutUser(req,res);
});

api.post('/user/login', function(req,res){
    UserCtrl.loginUser(req,res);
});

/* API -> need to be connected or logged before and get his token into cookie to used these routes */
api.get('/user/list', function(req,res){
    UserCtrl.listUser(req,res);
});

//TODO : // coté client, recuperer la réponse de l'api le token et le store dans cookie (utiliser ensuite sur toute les routs api)






//run
let port = process.env.PORT || 8080; // used to create, sign, and verify tokens
api.listen(port);
console.log('API intranet run at http://localhost:' + port);

