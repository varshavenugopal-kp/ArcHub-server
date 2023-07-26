const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser=require('cookie-parser')
import userRouter from "./src/Interfaces/routes/userRoutes";
import companyRouter from "./src/Interfaces/routes/companyRouter"
import adminRouter from "./src/Interfaces/routes/adminRoutes"
import connectToDatabase from "./src/Infra/database/dbConfig";
import ChatRouter from './src/Interfaces/routes/ChatRouter'
import { errorHandler } from "./src/Utils/errorHandler";
import { companyAuth } from "./src/Interfaces/middlewares/companyAuth";
import { adminAuth } from "./src/Interfaces/middlewares/adminAuth";
require('dotenv').config();
const app=express()
app.listen(3001,()=>{
    console.log("connected");
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


