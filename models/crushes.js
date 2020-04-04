var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CrushSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    
    crushs: [
        {
            crushesId: { type: mongoose.Types.ObjectId, required: true},
            crushesNickName: {type: String},
            crushesName: { type: String, required: true},
            crushesAge: {type: String, required: true},
            crushesGender: {type: String, required: true},
            crushing: {type: Boolean, required: true},
            reverseCrushing: {type: Boolean, required: true}
        }
    ]

});

module.exports = mongoose.model('Crush', CrushSchema);
