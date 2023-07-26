import mongoose, { ObjectId } from "mongoose";
import { ChatRepository } from "../../../Infra/repositories/ChatRepository";
import { MessageRepository } from "../../../Infra/repositories/MessageRepository";
export const accessChat=(chatRepository:ChatRepository)=>async(cid:string,userid:string)=>{
    const res=await chatRepository.createChat(cid,userid)
    return res
}
export const getChats=(chatRepository:ChatRepository)=>async(userId:string,cmpId:string)=>{
    const chats=await chatRepository.getAllChats(userId,cmpId)
    return chats
}
export const sendingMessage=(MessageRepository:MessageRepository)=>async(userId:string,cmpId:string,chatId:string,content:string)=>{
    const message=await MessageRepository.sendMsg(chatId,content,userId,cmpId)
   return message
}