/**
 * Created by SYLVAIN on 20/11/2017.
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
    addMater: function (req, res) {
        //TODO .populate avec un objet mater / grade etc par la suite
        checkToken(req, function (data) { //data est la reponse JSON du test du token si success => token SINON error message classic
            if (data.error === true) {
                //error
                res.json(data)
            } else {
                let dataPostedByApp = req.body; //json received from API call app post
                let materName = dataPostedByApp.name;
                if(materName !== ""){
                    //TODO save new matter (then add field to attribute with user One user Many maters
                    let mater = new Mater({
                        name: materName,
                    });
                    mater.save(function(err){
                        if(err)
                            console.log("error while insert new mater", err);
                        else
                            res.json({error: false, message:"Your mater inserted with success !"})

                    }).catch(err => console.log(err))
                }else{
                    res.json({error: true, message: "Your mater name is null ! "});
                }
            }
        });

    },
    //TODO: debug ca!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    addUserForMater: function(req,res){
        checkToken(req, function (data) { //data est la reponse JSON du test du token si success => token SINON error message classic
            if (data.error === true) {
                //error
                res.json(data)
            } else {
                let dataPostedByApp = req.body; //json received from API call app post
                let userName = dataPostedByApp.username;
                let materName = dataPostedByApp.mater;
                if(userName !== "" && materName !== ""){
                    //todo check if user exist / mater

                    User.find({name: userName}).then(function(userFound){
                            Mater.find({name: materName}).then(function(materFound){
                                    //todo insert user into mater
                                    //todo mater into user
                                //list array => populate to display user per mater
                                console.log("MY USER" , userFound);
                                console.log("MY MATER", materFound);

                                userFound[0].maters.push(materFound[0]._id);
                                materFound[0].users.push(userFound[0]._id);

                                    console.log("user update ", userFound);
                                     console.log("mater update ", materFound);
                                   userFound[0].save().catch(err => console.log(err));
                                   materFound[0].save().catch(err => console.log(err));
                                   res.json({error: false, message:"Matter / user updated with success "})

                            }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }else{
                    res.json({error: true, message: "Please fill correclty the fields ! "});
                }
            }
        });
    },
    listMater: function(req,res){
        //TODO: populate on user to have user per mater (later)
        Mater.find().populate('users').then(function(maters){
            if(maters)
                res.json({error:false, maters})
        }).catch(err => console.log(err))
    }

    //TODO: // suite route API
};
