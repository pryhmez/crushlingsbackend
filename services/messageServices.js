var mongoose = require('mongoose');
const userModel = require("../models/users");
const crushModel = require('../models/crushes');
const contactsModel = require('../models/contacts');
const messageModel = require('../models/messages');
const ObjectId = mongoose.Types.ObjectId;

const bcrypt = require("bcrypt");


//saves any message that is being handled to the database
const saveMessage = async function (data) {

    //gets the number of friends

}

module.exports = {
    saveMessage
}
