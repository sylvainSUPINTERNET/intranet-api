/**
 * Created by SYLVAIN on 03/11/2017.
 */
'use strict';


//GENERATE RANDOM STRING FOR SALT
module.exports = function stringGen(len) {
    let text = " ";

    let charset = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));

    return text;
};
