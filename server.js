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


// /* CONTROLLER */
const UserCtrl = require('./controllers/User.controller');
const MaterCtrl = require('./controllers/Mater.controller');
const NoteCtrl = require('./controllers/Note.controller');

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

//todo : => client setCookie token received from message api !!!! et le send pour chaque requete evidement

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


/* MATER */
api.post('/mater/add', function(req,res){
    MaterCtrl.addMater(req,res);
});

api.post('/mater/addUser', function(req,res){
    MaterCtrl.addUserForMater(req,res);
});

api.get('/mater/list', function(req,res){
    MaterCtrl.listMater(req,res);
});

api.get('/note/list', function(req,res){
    NoteCtrl.listNote(req,res);
});



//OSEF juste pour tester les posts (car le token est mal gérer par postman)
// TEST form (for post query because dosnt work with postman)
api.get('/mater/add/test',function(req,res){
    res.sendfile('form_for_test/test_add_matter.html');
});

api.get('/mater/addUser/test',function(req,res){
    res.sendfile('form_for_test/test_add_user_for_matter.html');
});

api.get('/user/add/test',function(req,res){
    res.sendfile('form_for_test/test_add_user.html');
});



//run
let port = process.env.PORT || 8080; // used to create, sign, and verify tokens
api.listen(port);
console.log('API intranet run at http://localhost:' + port);

