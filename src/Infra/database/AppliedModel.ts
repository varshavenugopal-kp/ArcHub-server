import mongoose,{Document,Model,Schema} from "mongoose";
import { AppliedJobs } from "../../Domain/models/AppliedJobs";

export type MongodbApplied=Model<Document<any,any,any>&AppliedJobs>
const AppliedSchema=new Schema<AppliedJobs>({
  jobId:{
    type:mongoose.Types.ObjectId,
    required:true
  },
  cId:{
    type:mongoose.Types.ObjectId,
    required:true
  },
  userId:{
    type:mongoose.Types.ObjectId,
    required:true
  },
  skills:{
    type:Array,
    required:true
  },
  details:{
    type:Object,
    required:true
  },
  file:{
    type:String
  },
  status:{
    type:Boolean,
    default:true
  }
})
export const AppliedModel:MongodbApplied=mongoose.connection.model<Document<any,any,any>&AppliedJobs>('appliedJobs',AppliedSchema)