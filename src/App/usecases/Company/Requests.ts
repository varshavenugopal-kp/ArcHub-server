import mongoose,{ObjectId} from "mongoose";
import { companyRepository } from "../../../Infra/repositories/companyRepository";
import { Jobs } from "../../../Domain/models/Jobs";

export const getRequests=(companyRepository:companyRepository)=>async(cId:mongoose.Types.ObjectId)=>{
    const requests=await companyRepository.getRequests(cId)
    return requests?requests:null
}