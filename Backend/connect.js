const mongoose = require('mongoose');
const chatSchema=require('./model/Model');
const RoomSchema=require('./model/ModelCreateRoom');
const chatModel = mongoose.model('room1', chatSchema);
const roomModel = mongoose.model('RoomCollection', RoomSchema);
const connect=async()=>{
      try {
            await mongoose.connect('mongodb://127.0.0.1/chatproject');
            console.log("Mongoose connected successfully");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
}
module.exports ={connect,chatModel,roomModel};