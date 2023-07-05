import mongoose,{Document,Model,Schema} from "mongoose";
import { Jobs } from "../../Domain/models/Jobs";
const {ObjectId} = mongoose.Types;
export type MongodbJob=Model<Document<any,any,any>&Jobs>

const jobschema=new Schema<Jobs>({
    cId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    deadline:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})
export const jobModel:MongodbJob=mongoose.connection.model<Document<any,any,any>&Jobs>('job',jobschema)