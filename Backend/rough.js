const { Server } = require('socket.io');
const server = app.listen(port, (err) => {
      if (!err) {
      console.log("server started at ", port);
      }
});

const io = new Server(server,{
      cors:{ origin: "http://localhost:3000",
      credentials: true }
});

io.on('connection', (socket) => {
      console.log("user connected", socket.id);
      socket.emit('msg', { message: `you are Connected ${socket.id}` });

      socket.on("join-room",(data)=>{
            // console.log("printing socket",socket);
      if (socket.room) {
      socket.leave(socket.room);
      console.log(`User ${socket.id} left room: ${socket.room}`);
      }
      socket.join(data);
      socket.room = data;
      console.log(`User ${socket.id} joined room: ${data}`);
})
      socket.on('clientMessage', async(data) => {
      console.log("Message from client:",data);
      const room=data.room;
      const user=data.user;
      const msg=data.message;
      const replyingto=data.replyingto;
      const replyingmsg=data.replyingmsg;
      const chatID=Date.now()+user;
      const chat={
            msgtype:data.msgtype,
            user:user,
            message:msg,
            room:room,
            replyingto:replyingto,
            replyingmsg:replyingmsg,
            chatID:chatID
      }
      const newmodel=new chatModel(chat);
      const respsonse=await newmodel.save();

      io.to(room).emit("message", chat);
    });


     socket.on('disconnect',()=>{
     console.log("socket id disconneted",socket.id);
    })
});

// ==================frontend 
seEffect(()=>{
      socket.on("doubtask",(msg)=>{
      console.log(msg);
      })

      
      socket.on("message",(msg)=>{
      console.log("msg from backend by socket io",msg)
      setAllMessage((preMessage)=>[...preMessage,msg])
      })
      },[]);



