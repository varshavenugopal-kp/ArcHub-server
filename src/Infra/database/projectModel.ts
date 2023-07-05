import mongoose,{Document,Model,Schema} from "mongoose";
import { Projects } from "../../Domain/models/Projects";

export type MongodbProject=Model<Document<any,any,any>&Projects>

const ProjectSchema=new Schema<Projects>({
    cid:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    pname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    url:{
        type:Array,
        required:true
    }
})
export const ProjectModel:MongodbProject=mongoose.connection.model<Document<any,any,any>&Projects>('Project',ProjectSchema)