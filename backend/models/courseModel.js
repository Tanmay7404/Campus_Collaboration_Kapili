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
    reviewer: String,
    img:String,
    message: {
      rating: {type: Number, enum:[1,2,3,4,5]},
      text: String,
      timestamp: { type: Date, default: ()=>new Date(Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric'})}
    }
  }],
  rating:{type:Number},
  // issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }],
  endorsements: Number,
  likedUsers: [String],
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  level:String,
});

const Course = mongoose.model('Course', courseSchema);

module.exports= Course;