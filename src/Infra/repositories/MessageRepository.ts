import mongoos from "mongoose";
import { MongodbMessage, MsgModel } from "../database/MessageModel";
import { Message } from "../../Domain/models/Chat";

export type MessageRepository={
    sendMsg:(chatId:string,content:string,userId:string,cmpId:string)=>Promise<Message>
}
export const MessageRepositoryImpl=(MsgModel:MongodbMessage):MessageRepository=>{
   
    return{

    }
}
