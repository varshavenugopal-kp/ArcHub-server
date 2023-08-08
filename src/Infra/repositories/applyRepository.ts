import { AppliedJobs } from "../../Domain/models/AppliedJobs";
import { MongodbApplied,AppliedModel } from "../database/AppliedModel";
import mongoos from "mongoose";

import mongoose, { ObjectId, UpdateWriteOpResult } from "mongoose";

export type applyRepository={
 create:(applies:AppliedJobs)=>Promise<AppliedJobs|null>
 
 getApplied:(userId:mongoos.Types.ObjectId)=>Promise<AppliedJobs[]>
 getAllApplied:(cid:mongoos.Types.ObjectId)=>Promise<AppliedJobs[]>
 getAllAppliedDetails:(cid:mongoos.Types.ObjectId,uId:mongoos.Types.ObjectId)=>Promise<AppliedJobs[]>
}

export const applyRepositoryImpl=(AppliedModel:MongodbApplied):applyRepository=>{
    const create=async(applies:AppliedJobs):Promise<AppliedJobs>=>{
        const appliedJobs=await AppliedModel.create(applies)
        return appliedJobs.toObject()
    }
    
    const getApplied=async(userId:mongoos.Types.ObjectId):Promise<AppliedJobs[]>=>{
      const jobs=await AppliedModel.aggregate([{$match:{userId:userId}},
        {
        $lookup:{from:'jobs',
        localField:'jobId',
        foreignField:'_id',
        as:'appliedjobs'
    }}])
    return jobs
    // const jobs=await AppliedModel.find({userId:userId})
    //   console.log("fhghgh")
    //   return jobs
    }
    const getAllApplied=async(cid:mongoos.Types.ObjectId):Promise<AppliedJobs[]>=>{
      const jobs=await AppliedModel.aggregate([{$match:{cId:cid}},
        {
        $lookup:{from:'jobs',
        localField:'jobId',
        foreignField:'_id',
        as:'appliedjobs'
    }}])
    return jobs
    // const jobs=await AppliedModel.find({userId:userId})
    //   console.log("fhghgh")
    //   return jobs
    }
    const getAllAppliedDetails=async(cid:mongoos.Types.ObjectId,uId:mongoos.Types.ObjectId):Promise<AppliedJobs[]>=>{
      const jobs=await AppliedModel.aggregate([{$match:{cId:cid,userId:uId}},
        {
        $lookup:{from:'jobs',
        localField:'jobId',
        foreignField:'_id',
        as:'appliedjobs'
    }}])
    return jobs
    // const jobs=await AppliedModel.find({userId:userId})
    //   console.log("fhghgh")
    //   return jobs
    }
    return{
      create,
      getApplied,
      getAllApplied,
      getAllAppliedDetails
    }
}