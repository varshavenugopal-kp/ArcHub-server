import mongoos from "mongoose";
import { ChatModel, MongodbChat } from "../database/ChatModel";
import { Chat } from "../../Domain/models/Chat";
import mongoose from "mongoose";

export type ChatRepository={
createChat:(cmpId:string,userId:string)=>Promise<Chat | Chat [] |null>
getAllChats:(userId:string,cId:string)=>Promise<Chat[] |null>
}

export const ChatRepositoryImpl=(ChatModel:MongodbChat):ChatRepository=>{
    const createChat=async(cmpId:string,userId:string):Promise<Chat | Chat [] |null>=>{
        const cmpid=new mongoose.Types.ObjectId(cmpId)
        const userid=new mongoose.Types.ObjectId(userId)
        const isChat=await ChatModel.find({
                  $and:[
                     {user:userId},{company:cmpId}
                  ]
                 })
            console.log("moyanthpranav",isChat);
            if(isChat.length>0){
                return isChat
            }else{
                const chatData:Chat={
                    chatName:'sender',
                    user:userid,
                    company:cmpid
                     
                }
                const createdChat=await ChatModel.create(chatData)
                const fullChat=await ChatModel.findOne({_id:createdChat._id}).populate('user','-password').populate('company','-password')
                console.log("chatttt",fullChat);
                
                return fullChat
    }}
    const getAllChats=async(userId:string,cmpId:string):Promise<Chat[] | null>=>{
        const id= new mongoose.Types.ObjectId(userId)
        const cId=new mongoos.Types.ObjectId(cmpId)
        const chats=ChatModel.find({
            $and:[
               {user:userId,company:cmpId}
            ]
           }).populate('users','-password').populate('latestMessage').sort({updatedAt:-1})
        return chats
    }
    return{
    createChat,
    getAllChats
    }
}