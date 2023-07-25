import mongoose,{ObjectId} from "mongoose";
import { JobRepository } from "../../../Infra/repositories/jobRepository";
import { Jobs } from "../../../Domain/models/Jobs";

export const getSaved=(jobRepository:JobRepository)=>async(uId:string)=>{
    const jobs=await jobRepository.getSaved(uId)
    return jobs?jobs:null
}