import mongoose, { ObjectId, UpdateWriteOpResult } from "mongoose";
import { Jobs } from "../../../Domain/models/Jobs";
import { JobRepository, JobRepositoryImpl } from "../../../Infra/repositories/jobRepository";
import { companyRepository } from "../../../Infra/repositories/companyRepository";

export const addBookmark=(jobRepository:JobRepository)=>async(jobId:mongoose.Types.ObjectId,uId:mongoose.Types.ObjectId):Promise<UpdateWriteOpResult|null>=>{
const addBookmark=await jobRepository.bookmark(jobId,uId)
return addBookmark
}
export const addRequest=(companyRepository:companyRepository)=>async(userId:mongoose.Types.ObjectId,cmpId:mongoose.Types.ObjectId):Promise<UpdateWriteOpResult|null>=>{
    const addBookmark=await companyRepository.request(userId,cmpId)
    return addBookmark
    }
