const mongoose = require('mongoose');

const Schema = require('mongoose').Schema;

const messageSchema = new Schema({
    chatRoomID: {
        type: String,
        required: true
    },
    senderID: {
        type: String,
        required: true
    },
    receiverID: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true 
    },
    timestamp:{
        type: String,
        required: true 
    }

}
);

const Message = mongoose.model('Message',messageSchema);
module.exports = Message;