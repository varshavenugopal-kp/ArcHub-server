import mongoose, { ObjectId } from "mongoose";
import { AppliedJobs } from "../../../Domain/models/AppliedJobs";
import { applyRepository } from "../../../Infra/repositories/applyRepository";
import { application } from "express";
export const apply=(applyRepository:applyRepository)=>async(cId:mongoose.Types.ObjectId,jobId:mongoose.Types.ObjectId,details:Object,skills:string[],file:string):Promise<AppliedJobs|null>=>{
    const applies:AppliedJobs={
         cId,
         jobId,
         details,
         skills,
         file
    };
    const appliedJob=await applyRepository.create(applies)
    return appliedJob
}