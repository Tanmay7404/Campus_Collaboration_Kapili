const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true ,unique:true},
  fullname:{ type: String, required: true },
  email: { type: String, required: true ,unique:true},
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  profileInfo: {
    bio: String,
    profilePicture: {url :String, filename: String}
  },
  skills:[{ type: String, ref: 'Tag' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  coursesCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }]  // this chat is renundant 
});

const User = mongoose.model('User', userSchema);

module.exports = User;