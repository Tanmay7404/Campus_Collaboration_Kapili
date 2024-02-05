const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relatedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  relatedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});
  
const Tag = mongoose.model('Tag', tagSchema);

module.exports.default = Tag;