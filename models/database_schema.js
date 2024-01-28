const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  profileInfo: {
    bio: String,
    profilePicture: String
  },
  skills:[{ type: String, ref: 'Tag' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  coursesCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }]
});

const User = mongoose.model('User', userSchema);

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  projectInfo: {
    description: String,
    videoLink: String,
    photoLink: String,
    projectLink: String
  },
  creators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  endorsements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [{ type: String, ref: 'Tag' }],
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: Date.now },
  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
  ongoing: Boolean,
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }]
});
  
const Project = mongoose.model('Project', projectSchema);

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true},
  description: String,
  lessons: [{ title: String, content: String }],
  tags: [{ type: String, ref: 'Tag' }],
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }]
});

const Course = mongoose.model('Course', courseSchema);

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
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
  lastMessageTime: Date,
  projectName: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

const issueSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  problem: String,
  responses: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    timestamp: { type: Date, default: Date.now },
    helpful: Boolean
  }],
  createdAt: { type: Date, default: Date.now },
  projectName: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  courseName: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  solved: Boolean
});
  
const Issue = mongoose.model('Issue', issueSchema);

const feedbackSchema = new mongoose.Schema({
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: {
    rating: {type: Number, enum:[1,2,3,4,5]},
    text: String,
    timestamp: { type: Date, default: Date.now }
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);


module.exports = {User:User, Project:Project, Course:Course, Tag:Tag, Chat:Chat, Feedback:Feedback};