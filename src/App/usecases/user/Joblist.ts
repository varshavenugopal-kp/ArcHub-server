import mongoose,{ObjectId} from "mongoose";
import { JobRepository } from "../../../Infra/repositories/jobRepository";
import { Jobs } from "../../../Domain/models/Jobs";

export const getJobs=(jobRepository:JobRepository)=>async()=>{
    const jobs=await jobRepository.getJobs()
    return jobs?jobs:null
}