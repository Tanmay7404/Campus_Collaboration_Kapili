const mongoose = require("mongoose");
const { Schema } = mongoose; // Import Schema from mongoose

const roomsSchema = new Schema({  // Use Schema instead of undefined Schema
  rooms: {
    type: Map,
    of: new Schema({
      name: { type: Schema.Types.ObjectId, ref: 'Chat' },
      value: { type: Schema.Types.Mixed }
    })
  }
});

const Rooms = mongoose.model('Room', roomsSchema);

module.exports = Rooms; // Export Rooms, not Chat
