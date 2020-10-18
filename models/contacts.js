var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, required: true,
        unique: false
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    contacts: [
        {
            friendsId: {
                type: mongoose.Schema.Types.ObjectId, required: true,
                index: { unique: false, dropDups: false }
            },
            friendsNickName: { type: String },
            friendsFirstName: { type: String, required: true },
            friendsLastName: { type: String, required: true },
            friendsAge: { type: String, required: true },
            friendsGender: { type: String, required: true },
            requestType: { type: String, required: true },
            requestStatus: { type: String, required: true }
        }],

    crushes: [
        {
            crushesId: { type: mongoose.Types.ObjectId, required: true },
            crushesNickName: { type: String },
            crushesName: { type: String, required: true },
            crushesAge: { type: String, required: true },
            crushesGender: { type: String, required: true },
            crushing: { type: Boolean, required: true },
            reverseCrushing: { type: Boolean, required: true }
        }
    ]

});

module.exports = mongoose.model('Friend', ContactSchema);
