import { AppliedJobs } from "../../Domain/models/AppliedJobs";
import { MongodbApplied,AppliedModel } from "../database/AppliedModel";
import mongoos from "mongoose";

import mongoose, { ObjectId, UpdateWriteOpResult } from "mongoose";

export type applyRepository={
 create:(applies:AppliedJobs)=>Promise<AppliedJobs|null>
}

export const applyRepositoryImpl=(AppliedModel:MongodbApplied):applyRepository=>{
    const create=async(applies:AppliedJobs):Promise<AppliedJobs>=>{
        const appliedJobs=await AppliedModel.create(applies)
        return appliedJobs.toObject()
    }
    

    return{
      create
    }
}