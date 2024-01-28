const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileInfo: {
    bio: String,
    profilePicture: String,
    // Add other profile information fields here
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  coursesCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }]
});

const User = mongoose.model('User', userSchema);

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    demoLink: String,
    creators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tags: [{ type: String, ref: 'Tag' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
const Project = mongoose.model('Project', projectSchema);


const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  lessons: [{ title: String, content: String }],
  tags: [{ type: String, ref: 'Tag' }],
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    relatedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    relatedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  });
  
const Tag = mongoose.model('Tag', tagSchema);

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: String,
      timestamp: { type: Date, default: Date.now }
    }],
    lastMessage: String,
    lastMessageTime: Date
  });
  
const Chat = mongoose.model('Chat', chatSchema);


module.exports = {User:User, Project:Project, Course:Course, Tag:Tag, Chat:Chat};