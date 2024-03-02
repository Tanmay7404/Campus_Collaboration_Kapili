const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique:true},
  creators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: String,
  courseLinks: [{ title: String, content: String }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  feedbacks: [{
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: {
      rating: {type: Number, enum:[1,2,3,4,5]},
      text: String,
      timestamp: { type: Date, default: Date.now }
    }
  }],
  rating: {type: mongoose.Schema.Types.Decimal128},
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }],
  helpful: Number,
});

const Course = mongoose.model('Course', courseSchema);

module.exports= Course;