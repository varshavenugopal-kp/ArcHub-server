import mongoose,{AnyArray, Document,Model,Schema} from "mongoose"
import { Chat } from "../../Domain/models/Chat"
export type MongodbChat=Model<Document<any,any,any>&Chat>

const ChatSchema=new Schema<Chat>({
    chatName:{
        type:String,
         required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'company'
    },
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'message'
    }

},
{
    timestamps:true
}
)
export const ChatModel:MongodbChat=mongoose.connection.model<Document<any,any,any>&Chat>('chat',ChatSchema)