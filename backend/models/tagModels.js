const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  groupname : String,
  name: { type: String, required: true, unique: true },
  color : String,
});
  
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;