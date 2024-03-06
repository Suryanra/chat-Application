const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const { Server } = require('socket.io');
const {connect,chatModel,roomModel} = require('./connect');
connect();
const multer=require('multer');
const path=require('path');
const UploadImage=require('./routes/UploadImage');

// Use the CORS middleware
const server = app.listen(port, (err) => {
      if (!err) {
      console.log("server started at ", port);
      }
});
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get('/',async(req,resp)=>{
      resp.send({messgae:"this is surya"});
})
// ====================================


const socketIO = require('./socketio'); // Import the socket.js file
socketIO.initSocket(server);
const Texting=require('./routes/Texting')
// app.get('/sendnotification',)


// app.get('/sendnotification',Texting)



// room createion

app.get("/roomcreate/:roomname",async(req,resp)=>{
const roomname=req.params.roomname;
let data=await roomModel.find({room:roomname});
if(data.length>0){
      return resp.send({status:false,
      message:"Same Room Name already exist"});
}

const roommodel=new roomModel({room:roomname});
data=await roommodel.save();
console.log(data);
// resp.send(data);
resp.send({status:true,
message:"room created "});
})
app.get("/rooms",async(req,resp)=>{
const roommodel=await roomModel.find({});
resp.send(roommodel);
})
app.get('/getchat/:room',async(req,resp)=>{
      try {
            console.log("accessing chat of room ",req.params.room);
            const messages = await chatModel.find({room:req.params.room}); 
            const frontendData = messages.map(item => ({ ...item._doc, _id: item._id.toString() }));      
            resp.send(frontendData);
            } catch (error) {
            resp.status(500).send({ error: 'Internal Server Error' });
      }
})

// =================handling image message:
const storage=multer.diskStorage({
      destination:(req,file,cb)=>{
      cb(null,'Images');
      },
      filename:(req,file,cb)=>{
      cb(null,Date.now()+path.extname(file.originalname))
      }
});
const upload=multer({storage:storage});
app.post("/upload",upload.single('image'),async(req,resp)=>{

      const imageurl= await UploadImage(req.file.filename);

      const replyingto=req.body.replyingto==="null"?null:req.body.replyingto;
      const replyingmsg=req.body.replyingmsg==="null"?null:req.body.replyingmsg;
      const chat={
            msgtype:req.body.msgtype,
            imagename:imageurl,
            user:req.body.user,
            message:req.body.message,
            room:req.body.room,
            replyingto:replyingto,
            replyingmsg:replyingmsg,
            chatID:Date.now()+req.body.user
      }

      const data=chatModel(chat);
      data.save();
      // io.to(req.body.room).emit("message", chat);
      socketIO.emitMessage(req.body.room,chat);
      resp.send({message:"data send",status:true});
})





