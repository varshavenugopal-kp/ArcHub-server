import mongoose from "mongoose"
export interface AppliedJobs{
    jobId?:mongoose.Types.ObjectId
    cId?:mongoose.Types.ObjectId
    userId?:mongoose.Types.ObjectId
    details?:object
    skills?:string[]
    file?:string
}

export interface details{
   firstName:string
   lastName:string
   email:string
   phone:number
   qualification:string
   experience:string
}