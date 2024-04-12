const mongoose = require("mongoose"); // needs some change as level is added

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name:{ type: String, required: true,unique:true },
  projectImage: {url :String, filename: String},
  projectInfo: {
    description: String,
    demoLinks: [{fileName:{type:String}, link:{type:String}}],
    projectLink: [{name:{type:String}, link:{type:String}}]
  },
  creators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  endorsements: Number,   // likes
  tags: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: Date.now },
  openForCollaboration:Boolean,
  ongoing: Boolean,
  feedbacks: [{
    reviewer: String,
    img:String,
    message: {
      rating: {type: Number, enum:[1,2,3,4,5]},
      text: String,
      timestamp: { type: Date, default: ()=>new Date(Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric'}) }
    }
  }],
  rating: {type:Number},
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  level:String,
});
  
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;