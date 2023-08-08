import mongoose, { ObjectId } from "mongoose";
import { AppliedJobs } from "../../../Domain/models/AppliedJobs";
import { applyRepository } from "../../../Infra/repositories/applyRepository";
import { application } from "express";
export const apply=(applyRepository:applyRepository)=>async(cId:mongoose.Types.ObjectId,jobId:mongoose.Types.ObjectId,userId:mongoose.Types.ObjectId,details:Object,skills:string[],file:string):Promise<AppliedJobs|null>=>{
    const applies:AppliedJobs={
         cId,
         jobId,
         userId,
         details,
         skills,
         file
    };
    const appliedJob=await applyRepository.create(applies)
    return appliedJob
}

// export const getApplied=(applyRepository:applyRepository)=>async(userId:mongoose.Types.ObjectId)=>{
//     const applied = await applyRepository.getApplied(userId)
//     console.log("applied",applied);
//     return applied?applied:null
// }

export const applied=(applyRepository:applyRepository)=>async(userId:mongoose.Types.ObjectId)=>{
    const applied=await applyRepository.getApplied(userId)
    return applied
}
export const allapplied=(applyRepository:applyRepository)=>async(cid:mongoose.Types.ObjectId)=>{
    const applied=await applyRepository.getAllApplied(cid)
    return applied?applied:null
}

export const allappliedDetails=(applyRepository:applyRepository)=>async(cid:mongoose.Types.ObjectId,uId:mongoose.Types.ObjectId)=>{
    const applied=await applyRepository.getAllAppliedDetails(cid,uId)
    return applied?applied:null
}
