import mongoose,{ObjectId} from "mongoose";
import { JobRepository } from "../../../Infra/repositories/jobRepository";
import { Jobs } from "../../../Domain/models/Jobs";

export const getId=(jobRepository:JobRepository)=>async(jobId:mongoose.Types.ObjectId)=>{
    const cid=await jobRepository.getId(jobId)
    return cid
}