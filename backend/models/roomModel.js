const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema({
  rooms: {
    type: Map,
    of: new Schema({
      name: { type: Schema.Types.ObjectId, ref: 'Chat' },
      value: { type: Schema.Types.Mixed }
    })
  }
});

const Rooms = mongoose.model('Room', roomsSchema);

module.exports = Chat;