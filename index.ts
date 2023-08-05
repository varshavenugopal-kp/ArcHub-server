const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser=require('cookie-parser')
import userRouter from "./src/Interfaces/routes/userRoutes";
import companyRouter from "./src/Interfaces/routes/companyRouter"

import adminRouter from "./src/Interfaces/routes/adminRoutes"
import connectToDatabase from "./src/Infra/database/dbConfig";
import ChatRouter from './src/Interfaces/routes/ChatRouter'
import messageRouter from './src/Interfaces/routes/messageRouter'
import { errorHandler } from "./src/Utils/errorHandler";
import { companyAuth } from "./src/Interfaces/middlewares/companyAuth";
import { adminAuth } from "./src/Interfaces/middlewares/adminAuth";
import { Socket } from 'socket.io'
import { newMessageRecieved } from "./src/Domain/models/Chat";
require('dotenv').config();

const app=express()
const server=app.listen(3001,()=>{
    console.log("connected");
})
const io=require('socket.io')(server , {
    pingTimeout:60000,
    cors:{
        origin:'http://localhost:3000'
        // origin:'http://10.4.3.148:3000'
    },
})

io.on("connection",(socket:any)=>{
console.log("connected to socket.io");
socket.on("setup", (userId:string) => {
    socket.join(userId);``
   //  console.log("usr joined room",userId);
    socket.emit("connected");
   })
//    socket.on("disconnect", ()=> {
//     console.log('user disconnected room');
    
// })
socket.on('join chat',(room:string)=>{
    socket.join(room)
    console.log("User Joined room : " + room);  
})
socket.on('new message',(newMessageReceived:newMessageRecieved)=>{
    let chat = newMessageReceived.chat
    console.log('new message=',newMessageReceived);
    const sender=newMessageReceived.user ? newMessageReceived.user : newMessageReceived?.company
    console.log('sender is',sender);
    console.log('newMessageReceived.chat.user=',newMessageReceived.chat?.user);
    
 //    if(!chat.user && !chat?.company) return console.log("Chat.users not defiend");
 if(sender?._id===newMessageReceived.chat?.user._id){
     console.log('user is the sender');
     
     socket.in(chat?.company._id).emit('message recieved',newMessageReceived)
 }
 if(sender?._id===newMessageReceived.chat?.company._id){
     console.log('company?.company is the sender');
     socket.in(chat?.user._id).emit('message recieved',newMessageReceived)
 }

 if(chat?._id===newMessageReceived.user?._id) return 
 socket.in(chat?.user._id).emit('message recieved',newMessageReceived);
 
 if(chat?._id===newMessageReceived.company?._id) return
 socket.in(chat?.company._id).emit('message recieved',newMessageReceived)
 })
})





connectToDatabase()

app.use(cookieParser())

app.use(express.json())

app.use(errorHandler);
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}))
app.use("/",userRouter)
app.use("/user",companyRouter)
app.use("/admin",adminRouter)
app.use("/chat",ChatRouter)
app.use("/message",messageRouter)


