import mongoos from "mongoose";
import { MongodbMessage, MsgModel } from "../database/MessageModel";
import { Message } from "../../Domain/models/Chat";
import { ChatModel } from "../database/ChatModel";
import mongoose from "mongoose";

export type MessageRepository={
    sendMsg:(content:string,chatId:string,user:string)=>Promise<Message>
    cmpSendMsg:(content:string,chatId:string,company:string)=>Promise<Message>
    getMsgsByChatId:(chatId:string)=>Promise<Message[]>
}
export const MessageRepositoryImpl=(MsgModel:MongodbMessage):MessageRepository=>{
    const sendMsg = async(content:string,chatId:string,user:string):Promise<Message>=>{
        const newChat:Message={
            company: new mongoose.Types.ObjectId(user),
            // user:new mongoose.Types.ObjectId(tutId),
            content,
            chat: new mongoose.Types.ObjectId(chatId),
            
        }
        let message=await MsgModel.create(newChat)
        message =await message.populate("user",'_id firstname lastname username profileImg')   
        message =await message.populate("user",'_id firstname lastname username profileImg')   
        message=await message.populate('chat')
        message=await message.populate('chat.user')
        message=await message.populate('chat.user')

        await ChatModel.updateOne({_id:new mongoose.Types.ObjectId(chatId)},{$set:{latestMessage:message}})

        return message
    }

    const cmpSendMsg = async(content:string,chatId:string,company:string):Promise<Message>=>{
        const newChat:Message={
            // currentUserId:new mongoose.Types.ObjectId(currentUserId),
            company:new mongoose.Types.ObjectId(company),
            content,
            chat:new mongoose.Types.ObjectId(chatId),
        }
        let message=await MsgModel.create(newChat)
        message =await message.populate("user",'_id firstname lastname username profileImg')   
        message =await message.populate("company",'_id firstname lastname username profileImg')   
        message=await message.populate('chat')
        message=await message.populate('chat.user')
        message=await message.populate('chat.company')    

        await ChatModel.updateOne({_id:new mongoose.Types.ObjectId(chatId)},{$set:{latestMessage:message}})
    
        return message
    }

    const getMsgsByChatId=async(chatId:string):Promise<Message[]>=>{
        const messages = await MsgModel.find({chat:new mongoose.Types.ObjectId(chatId)}).populate("user",'firstname lastname username profileImg').populate("company",'firstname lastname username profileImg')
        .populate('chat')
        return messages
    }
return{
    sendMsg,
    cmpSendMsg,
    getMsgsByChatId
}
}
