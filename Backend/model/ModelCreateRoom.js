const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
      room:{type:String,unique:true}
      });
module.exports = RoomSchema;
