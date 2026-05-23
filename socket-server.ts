import { createServer } from "http";
import {Server} from "socket.io";
const httpServer = createServer();
const io = new Server(httpServer , {
    cors :{
        origin: "*",
    },
})


io.on("connection" , (socket) =>{
    console.log("client connnected" , socket.id);

 socket.on("disconnect" , ()=>{
    console.log("client disconnected" , socket.id);
 });
});

httpServer.listen(4000 , ()=>{
    console.log("socket server running on port 4000");
});

export {io};