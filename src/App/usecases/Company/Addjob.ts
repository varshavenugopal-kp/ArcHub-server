import mongoose, { ObjectId } from "mongoose";
import { Jobs } from "../../../Domain/models/Jobs";
import { JobRepository, JobRepositoryImpl } from "../../../Infra/repositories/jobRepository";
export const addJob=(JobRepository:JobRepository)=>async(title:string,cId:mongoose.Types.ObjectId,salary:number,qualification:string,experience:string,deadline:Date,type:string,description:string):Promise<Jobs|null>=>{
    const newJob:Jobs={
        title,
        cId,
        salary,
        qualification,
        experience,
        deadline,
        type,
        description
    };
    const createdJob=await JobRepository.create(newJob)
    return createdJob
}