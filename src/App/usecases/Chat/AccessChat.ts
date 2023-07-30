import mongoose, { ObjectId } from "mongoose";
import { ChatRepository } from "../../../Infra/repositories/ChatRepository";
import { MessageRepository } from "../../../Infra/repositories/MessageRepository";
export const accessChat=(chatRepository:ChatRepository)=>async(userid:string,cid:string)=>{
    const res=await chatRepository.createChat(cid,userid)
    return res
}
export const getChats=(chatRepository:ChatRepository)=>async(userId:string,cmpId:string)=>{
    const chats=await chatRepository.getAllChats(userId,cmpId)
    return chats
}
export const sendingMessage=(MessageRepository:MessageRepository)=>async(chatId:string,content:string,userId:string,cmpId:string)=>{
    const message=await MessageRepository.sendMsg(chatId,content,userId,cmpId)
   return message
}
 export const getAllMessages=(MessageRepository:MessageRepository)=>async(chatId:string)=>{
    const messages=await MessageRepository.getMsgsByChatId(chatId)
    return messages
 }