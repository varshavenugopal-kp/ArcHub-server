import mongoose, { ObjectId, UpdateWriteOpResult } from "mongoose";
import { Jobs } from "../../../Domain/models/Jobs";
import { JobRepository, JobRepositoryImpl } from "../../../Infra/repositories/jobRepository";

export const removeBookmark=(jobRepository:JobRepository)=>async(jobId:mongoose.Types.ObjectId,uId:string):Promise<UpdateWriteOpResult|null>=>{
const addBookmark=await jobRepository.removebookmark(jobId,uId)
return addBookmark
}