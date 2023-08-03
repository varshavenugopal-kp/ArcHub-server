import { Request,Response } from "express";
import { ChatModel } from "../../Infra/database/ChatModel";
import { ChatRepositoryImpl } from "../../Infra/repositories/ChatRepository";
import mongoose from "mongoose";
import { accessChat, cmpSendingMessage, getAllMessages, getChats, getCompanyChats, sendingMessage } from "../../App/usecases/Chat/AccessChat";
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
export const fetchUserChatController=async(req:Request,res:Response)=>{
    const userId:string=req.params.userId
   
    try{
const allChats=await getChats(ChatRepository)(userId)
res.status(202).json({chats:allChats})

    }catch(error){
        console.log(error);
        
    }
    
}


export const fetchCompanyChatController = async(req:Request,res:Response)=>{
    try{
      const cId = req.params.cId;
      const allChats = await getCompanyChats(ChatRepository)(cId);
      // console.log(allChats);
      res.json({message:'chat fetch success',allChats})
    }catch (error) {
          
          res.status(500).json({ message: "Internal server error" });
        }
  }
  






export const sendMessage=async(req:Request,res:Response)=>{
    // const userId:string=req.params.userId
    // const cId:string=req.params.cId
    const {content,chatId,currentUserId,currentRole}=req.body
    console.log(req.body);
    
    try{
       
        // const msg=await sendingMessage(messageRepository)(chatId,content,userId,cmpId)
        // res.json({message:"successfull",msg})
        if(currentRole === 'user'){
            const user = currentUserId;
            const msg=await sendingMessage(messageRepository)(content,chatId,user)
            // console.log('msgg=',msg); 
            res.json({message:'success',msg})
          }
          else{
            const company = currentUserId;
            const msg=await cmpSendingMessage(messageRepository)(content,chatId,company)
            // console.log('msgg=',msg); 
            res.json({message:'success',msg})
          }

    }catch(error){
        console.log(error);
        
    }
    
}

export const getMessagesByChatId=async(req:Request,res:Response)=>{
    // const userId:string=req.params.userId
    // const cId:string=req.params.cId
    const chatId=req.body.chatId
    console.log(req.body);
    
    try{
       
        const messages=await getAllMessages(messageRepository)(chatId)
        res.status(201).json({messages})
    }catch(error){
        console.log(error);

        
    }
    
}



