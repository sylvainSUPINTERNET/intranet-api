/**
 * Created by SYLVAIN on 20/11/2017.
 */

'use strict';


// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const ObjectId  = mongoose.Schema.Types.ObjectId; //permet de creer un champ qui sera un d'objectId de custommer par exemple



mongoose.Promise = global.Promise;


const materSchema = new mongoose.Schema({
    name: String,
    users: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ]

});

module.exports = mongoose.model('Mater', materSchema);
