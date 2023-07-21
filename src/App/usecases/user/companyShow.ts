import mongoose,{ObjectId} from "mongoose";
import { companyRepository } from "../../../Infra/repositories/companyRepository";


export const getCompany=(companyRepository:companyRepository)=>async(cid:mongoose.Types.ObjectId)=>{
    const company=await companyRepository.getCompany(cid)
    return company?company:null
}