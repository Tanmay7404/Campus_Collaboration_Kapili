const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique:true},
  creators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  courseImage: {url :String, filename: String},
  courseInfo: {
    description: String,
    demoLinks: [{fileName:{type:String}, link:{type:String}}],
    courseLink: [{name:{type:String}, link:{type:String}}]
  },
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
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },

});

const Course = mongoose.model('Course', courseSchema);

module.exports= Course;