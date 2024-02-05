const mongoose = require("mongoose");

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
  tags: [{ type: String, ref: 'Tag' }],
  solved: Boolean
});
  
const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;