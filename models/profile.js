var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    userId: { type: String, required: true },

    firstName: { type: String, required: true, trim: true },

    lastName: { type: String, required: true, trim: true },

    nickName: { type: String },

    email: {
        type: String,
        required: true,
        lowercase: true,
        // index: {unique: true, dropDups: true},
        unique: true
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        // index: {unique: true, dropDups: true} 
    },

    gender: { type: String, required: true, trim: true },
    age: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    createdDate: { type: Date, default: new Date() },
    profilePic: String
});

module.exports = mongoose.model('Profile', ProfileSchema);
