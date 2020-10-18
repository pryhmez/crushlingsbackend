var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    chatId: {type: String, required: true, trim: true},

	firstUserId: { type: String, required: true , trim: true},

	secondUserId: { type: String, required: true, trim: true },
	
	firstUserName: { type: String, required: true, trim: true},
	secondUserName: {type: String, required: true, trim: true},
	createdDate: { type: Date, default: new Date() },
   

	messages: [
        {
            recieversId: { type: String, required: true},

            _id: { type: Schema.Types.ObjectId, required: true, default: new mongoose.Types.ObjectId },
            text: { type: String, required: true },
            createdAt: { type: Date, default: new Date()},

            user: {
               _id: { type: String, required: true },
               name: {type: String, required: true},
               avatar: {type: String, default: "https://picsum.photos/200/300"}
            },

            image: { type: String  },
            audio: { type: String  },
            video: { type: String  },
            quickReplies: { type: String  },

            sent: { type: Boolean, default: true, required: true },
            delivered: {type: Boolean, default: false, required: true},
            recieved: { type: Boolean, default: false, required: true},
            system: { type: Boolean, default: false, required: false},
        }]
});

module.exports = mongoose.model('Message', MessageSchema);