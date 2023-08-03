import mongoose, { ObjectId } from "mongoose";
import { ChatRepository } from "../../../Infra/repositories/ChatRepository";
import { MessageRepository } from "../../../Infra/repositories/MessageRepository";
export const accessChat=(chatRepository:ChatRepository)=>async(userid:string,cid:string)=>{
    const res=await chatRepository.createChat(cid,userid)
    return res?res:null
}
export const getChats=(chatRepository:ChatRepository)=>async(userId:string)=>{
    const chats=await chatRepository.getAllUserChats(userId)
    return chats
}
export const getCompanyChats = (chatRepository:ChatRepository)=>async(cId:string)=>{
    const chats = await chatRepository.getAllCmpChats(cId);
    return chats
 }
 export const getAllMessages = (messageRepository:MessageRepository)=>async(chatId:string)=>{
    const messages = await messageRepository.getMsgsByChatId(chatId)
    return messages;
}
export const sendingMessage = (messageRepository:MessageRepository)=>async(content:string,chatId:string,user:string)=>{
    const message = await messageRepository.sendMsg(content,chatId,user);
    return message;
  }
  export const cmpSendingMessage = (messageRepository:MessageRepository)=>async(content:string,chatId:string,company:string)=>{
    const message = await messageRepository.cmpSendMsg(content,chatId,company);
    return message;
  }
// export const sendingMessage=(MessageRepository:MessageRepository)=>async(chatId:string,content:string,userId:string,cmpId:string)=>{
//     const message=await MessageRepository.sendMsg(chatId,content,userId,cmpId)
//    return message
// }
//  export const getChats=(MessageRepository:MessageRepository)=>async(chatId:string)=>{
//     const messages=await MessageRepository.getMsgsByChatId(chatId)
//     return messages
//  }
//  export const getAllCmpMessages = (chatRepository:ChatRepository)=>async(cId:string)=>{
//     const chats = await chatRepository.getAllCmpChats(cId);
//     return chats
//  }
//  export const tutorSendingMessage = (messageRepository:MessageRepository)=>async(content:string,chatId:string,company:string)=>{
//     const message = await messageRepository.cmpSendMsg(content,chatId,company);
//     return message;
//   }