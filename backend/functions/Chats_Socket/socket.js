const {Rooms} = require("../../server.js");
const ROOMS = require("../../models/roomModel.js");


function createRoom(roomId,participants){
    Rooms[roomId] = {users:participants};
    Rooms.save();
}

// SOCKET CODE
// 1) New User -> add that to new user
// 2) Room message -> Chats


module.exports = createRoom;