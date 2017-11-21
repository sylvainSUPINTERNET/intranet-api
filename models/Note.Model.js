

const mongoose = require('mongoose');

const ObjectId  = mongoose.Schema.Types.ObjectId;

mongoose.Promise = global.Promise;


const materSchema = new mongoose.Schema({
    note: Integer,
    matter: [
        {
            type: ObjectId,
            ref: 'Matter'
        }
    ],
    users: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ]

});

module.exports = mongoose.model('Note', materSchema);
