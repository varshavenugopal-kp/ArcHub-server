import mongoose, { ObjectId, UpdateWriteOpResult } from "mongoose";
import { Jobs } from "../../../Domain/models/Jobs";
import { JobRepository, JobRepositoryImpl } from "../../../Infra/repositories/jobRepository";

export const addBookmark=(jobRepository:JobRepository)=>async(jobId:mongoose.Types.ObjectId,uId:string):Promise<UpdateWriteOpResult|null>=>{
const addBookmark=await jobRepository.bookmark(jobId,uId)
return addBookmark
}