const mongoose = require('mongoose');

const Schema = require('mongoose').Schema;

const chatRoomSchema = new Schema({
    chatRoomID: {
        type: String,
        required: true
    },
    users: [{
        type: String,
        required: true
    }],
}
);

const Chatroom = mongoose.model('Chatroom',chatRoomSchema);
module.exports = Chatroom;