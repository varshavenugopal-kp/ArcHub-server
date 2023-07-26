import mongoose from "mongoose";
import { User } from "./User";
import { Company } from "./Company";



export interface Chat{
    chatName:string,
    user:mongoose.Types.ObjectId
    company:mongoose.Types.ObjectId
    latestMessage?:mongoose.Types.ObjectId,
    
}

export interface Message{
    user:mongoose.Types.ObjectId
    company:mongoose.Types.ObjectId
    content:string
    chat:mongoose.Types.ObjectId,
   
}

export interface newMessageRecieved{
    _id:string,
    sender:Sender,
    content:string,
    chat:ChatInMsg

}
interface Sender{
    _id:string,
    username: string,
    firstname: string,
    lastname: string,
    profileIm:string
}
interface ChatInMsg{
    _id:string,
    users:User,
    company:Company
    
}