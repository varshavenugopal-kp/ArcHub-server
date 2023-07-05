import { Jobs } from "../../Domain/models/Jobs";
import { MongodbJob,jobModel } from "../database/jobModel";
import { ObjectId } from "mongoose";

export type JobRepository={
    create:(jobs:Jobs)=>Promise<Jobs|null>
}

export const JobRepositoryImpl=(jobModel:MongodbJob):JobRepository=>{
    const create=async(job:Jobs):Promise<Jobs>=>{
        const createJob=await jobModel.create(job);
        return createJob.toObject()
    }

return{
    create
}    
}

