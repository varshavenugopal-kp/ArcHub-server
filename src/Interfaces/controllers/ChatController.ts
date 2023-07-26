import { Request,Response } from "express";
import { ChatModel } from "../../Infra/database/ChatModel";
import { ChatRepositoryImpl } from "../../Infra/repositories/ChatRepository";
import mongoose from "mongoose";
import { accessChat, getChats } from "../../App/usecases/Chat/AccessChat";
import { MsgModel } from "../../Infra/database/MessageModel";
import { MessageRepositoryImpl } from "../../Infra/repositories/MessageRepository";
const Chatdb=ChatModel
const msgDb=MsgModel
const messageRepository=MessageRepositoryImpl(msgDb)
const ChatRepository=ChatRepositoryImpl(Chatdb)

export const accessChatController=async(req:Request,res:Response)=>{
   const {userId,cmpId}=req.body
   

    try{
        if(!userId||!cmpId){
            res.status(400).json({ message: "error" });
        }else{
           
            const chat=await accessChat(ChatRepository)(userId,cmpId)
            res.status(201).json({ message: "successful", chat });
        }
    }catch(error){

    }
   

}
export const fetchChatController=async(req:Request,res:Response)=>{
    const userId:string=req.params.userId
    const cId:string=req.params.cId
    try{
const allChats=await getChats(ChatRepository)(userId,cId)
res.status(202).json({chats:allChats})

    }catch(error){
        console.log(error);
        
    }
    
}

export const sendMessageController=async(req:Request,res:Response)=>{
    // const userId:string=req.params.userId
    // const cId:string=req.params.cId
    const {content,chatId,userId,cmpId}=req.body
    try{
       
        const msg=await sendingMessage(messageRepository)(chatId,content,userId,cmpId)
        res.json({msg})

    }catch(error){
        console.log(error);
        
    }
    
}

