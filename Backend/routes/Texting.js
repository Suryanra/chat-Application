const socketIO =require('./../socketio')

const Texting = (req,resp) => {
console.log("texting function")
      const room = "room1";
      const message = {
          msgtype: "text1",
          user: "backend1",
          message: "Hello from the backend!"
      };
      
      socketIO.emitMessage(room, message);
      resp.send("data");

}

module.exports=Texting
