import mongoose, { Model, Schema ,Document } from "mongoose";
import { Message } from "../../Domain/models/Chat";

export type MongodbMessage=Model<Document<any,any,any>&Message>;

const MsgSchema = new Schema<Message>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'company'
    },
    content:{
        type:'String',
        trim:true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chat'
    },
    
},
{
    timestamps:true
})

export const MsgModel:MongodbMessage=mongoose.connection.model<Document<any, any, any> & Message>('message', MsgSchema);