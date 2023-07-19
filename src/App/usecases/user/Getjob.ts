import mongoose,{ObjectId} from "mongoose";
import { JobRepository } from "../../../Infra/repositories/jobRepository";
import { Jobs } from "../../../Domain/models/Jobs";

export const getjob=(jobRepository:JobRepository)=>async(jobId:mongoose.Types.ObjectId)=>{
    const jobs=await jobRepository.getJob(jobId)
    return jobs?jobs:null
}