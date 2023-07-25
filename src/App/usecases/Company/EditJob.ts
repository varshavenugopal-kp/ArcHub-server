import mongoos,{ObjectId, } from "mongoose";
import { Jobs } from "../../../Domain/models/Jobs";
import { JobRepository, JobRepositoryImpl } from "../../../Infra/repositories/jobRepository";
import { UpdateWriteOpResult } from "mongoose";

export const update=(JobRepository:JobRepository)=>async(jbId:mongoos.Types.ObjectId,data:Jobs):Promise<UpdateWriteOpResult|null>=>{
    const editedJob=await JobRepository.EditJob(jbId,data)
    return editedJob
}

// export const addServices=(companyRepository:companyRepository)=>async(cid:mongoos.Types.ObjectId,services:Array<object>):Promise<UpdateWriteOpResult>=>{
    
//     const createServices=await companyRepository.addServices(services,cid)
//     return createServices
// }