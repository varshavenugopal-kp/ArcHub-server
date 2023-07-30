import mongoos from "mongoose";
import { MongodbMessage, MsgModel } from "../database/MessageModel";
import { Message } from "../../Domain/models/Chat";
import { ChatModel } from "../database/ChatModel";
import mongoose from "mongoose";

export type MessageRepository={
    sendMsg:(chatId:string,content:string,userId:string,cmpId:string)=>Promise<Message>
    getMsgsByChatId:(chatId:string)=>Promise<Message[]>
}
export const MessageRepositoryImpl=(MsgModel:MongodbMessage):MessageRepository=>{
    const sendMsg=async(chatId:string,content:string,userId:string,cmpId:string):Promise<Message >=>{
        const newChat:Message={
            user:new mongoos.Types.ObjectId(userId),
            company:new mongoos.Types.ObjectId(cmpId),
            content,
            chat:new mongoos.Types.ObjectId(chatId),
           
           
        }
        let message=await MsgModel.create(newChat)
        message =await message.populate("user",'_id firstname lastname username profileImg')   
        message =await message.populate("company",'_id firstname lastname username profileImg')
        message=await message.populate('chat')
        message=await message.populate('chat.user')
        message=await message.populate('chat.company')
        

        await ChatModel.updateOne({_id:new mongoos.Types.ObjectId(chatId)},{$set:{latestMessage:message}})

        return message
 
}
const getMsgsByChatId=async(chatId:string):Promise<Message[]>=>{
    const messags=await MsgModel.find({chat:new mongoose.Types.ObjectId(chatId)}).populate("user",'firstname lastname username profileImg').populate("company",'firstname lastname username profileImg')
    .populate('chat')
    return messags
}
return{
    sendMsg,
    getMsgsByChatId
}
}
