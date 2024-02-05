const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    timestamp: { type: Date, default: Date.now }
  }],
  lastMessage: String,
  lastMessageTime: Date,
  projectName: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;