import { Jobs } from "../../Domain/models/Jobs";
import { User } from "../../Domain/models/User";
import { companyModel } from "../database/companyModel";
import { MongodbJob,jobModel } from "../database/jobModel";
import mongoose, { ObjectId, UpdateWriteOpResult } from "mongoose";
import mongoos from "mongoose";

export type JobRepository={
    create:(jobs:Jobs)=>Promise<Jobs|null>
    getJobs:()=>Promise<Jobs[]>
    getJob:(cid:mongoos.Types.ObjectId)=>Promise<Jobs[]|null>
    EditJob:(jbId:mongoos.Types.ObjectId,jobs:Jobs)=>Promise<UpdateWriteOpResult|null>
    getId:(jobId:mongoos.Types.ObjectId)=>Promise<Jobs|null>
    // update:(jobs:Jobs,jobId:mongoos.Types.ObjectId)=>Promise<UpdateWriteOpResult|null>
    bookmark:(jobId:mongoos.Types.ObjectId,uId:string)=>Promise<UpdateWriteOpResult|null>
    removebookmark:(jobId:mongoos.Types.ObjectId,uId:string)=>Promise<UpdateWriteOpResult|null>
    getSaved:(uId:string)=>Promise<Jobs[]>
}


export const JobRepositoryImpl=(jobModel:MongodbJob):JobRepository=>{
    const create=async(job:Jobs):Promise<Jobs>=>{
        const createJob=await jobModel.create(job);
        return createJob.toObject()
    }
    const getJobs=async():Promise<Jobs[]>=>{
        const jobs=await jobModel.aggregate([{$lookup:{from:"companies",localField:"cId",foreignField:"_id",as:"cmpInfo"}}])
        console.log(jobs,"moynt");
        
        return jobs
    }

    const getJob=async(jobId:mongoos.Types.ObjectId):Promise<Jobs[]|null>=>{
        const jobs=await jobModel.aggregate([{$match:{_id:jobId}},{$lookup:{from:"companies",localField:"cId",foreignField:"_id",as:"cmpInfo"}}])
        console.log("varsha",jobs);
        return jobs
    }
    const EditJob = async(jobId:mongoose.Types.ObjectId,jobs:Jobs):Promise<UpdateWriteOpResult|null>=>{
        console.log("lllklklklkk",jobs);
        const jobEdit=await jobModel.updateOne({_id:jobId},{$set:{title:jobs.title,salary:jobs.salary,qualification:jobs.qualification,experience:jobs.experience,deadline:jobs.deadline,type:jobs.type,description:jobs.description}})
        return jobEdit
        // try{
        //     const jobedit=await jobModel.findByIdAndUpdate({_id:jobId},{$set:{jobs},},{new:true});
        //     return null;
        // }catch(error){
        //     return null;
        // }
    }
    const getId=async(jobId:mongoos.Types.ObjectId):Promise<Jobs | null>=>{
        const jobs=await jobModel.findOne({_id:jobId})
        console.log("varsha",jobs);
        return jobs
    }
    const bookmark=async(jobId:mongoos.Types.ObjectId,uId:string):Promise<UpdateWriteOpResult>=>{
        const bookmarkedJob=await jobModel.updateOne({_id:jobId},{$push:{bookmarks:uId}})
        console.log("good spirit pls come",bookmarkedJob);
        
        return bookmarkedJob
    }

    const removebookmark=async(jobId:mongoos.Types.ObjectId,uId:string):Promise<UpdateWriteOpResult>=>{
        const removebookmarkedJob=await jobModel.updateOne({_id:jobId},{$pull:{bookmarks:uId}})
        console.log("good spirit pls come",removebookmarkedJob);
        
        return removebookmarkedJob
    }

    const getSaved=async(uId:string):Promise<Jobs[]>=>{
        const jobs=await jobModel.aggregate([
            {
                $match:{
                    bookmarks:{$in:[new mongoose.Types.ObjectId(uId)]}
                }
            },{
                $lookup:{
                    from:'users',
                    localField:'uid',
                    foreignField:'_id',
                    as:'saved'
                }
            }
        ])
        return jobs
    }
return{
    create,
    getJobs,
    getJob,
    EditJob,
    getId,
   bookmark,
   removebookmark,
   getSaved
}    
}


