import { Jobs } from "../../Domain/models/Jobs";
import { MongodbJob,jobModel } from "../database/jobModel";
import { ObjectId } from "mongoose";
import mongoos from "mongoose";

export type JobRepository={
    create:(jobs:Jobs)=>Promise<Jobs|null>
    getJobs:()=>Promise<Jobs[]>
    getJob:(cid:mongoos.Types.ObjectId)=>Promise<Jobs[]|null>
}

export const JobRepositoryImpl=(jobModel:MongodbJob):JobRepository=>{
    const create=async(job:Jobs):Promise<Jobs>=>{
        const createJob=await jobModel.create(job);
        return createJob.toObject()
    }
    const getJobs=async():Promise<Jobs[]>=>{
        const jobs=await jobModel.aggregate([{$lookup:{from:"companies",localField:"cId",foreignField:"_id",as:"cmpInfo"}}])
        console.log(jobs,"moynt");
        
        return jobs
    }

    const getJob=async(jobId:mongoos.Types.ObjectId):Promise<Jobs[]|null>=>{
        const jobs=await jobModel.aggregate([{$match:{_id:jobId}},{$lookup:{from:"companies",localField:"cId",foreignField:"_id",as:"cmpInfo"}}])
        console.log("varsha",jobs);
        return jobs
    }

return{
    create,
    getJobs,
    getJob
}    
}


