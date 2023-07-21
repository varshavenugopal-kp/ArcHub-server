import mongoos,{ObjectId, UpdateWriteOpResult} from "mongoose";
import { Company } from "../../../Domain/models/Company";
import { companyRepository,companyRepositoryImpl } from "../../../Infra/repositories/companyRepository";

export const addServices=(companyRepository:companyRepository)=>async(cid:mongoos.Types.ObjectId,services:Array<object>):Promise<UpdateWriteOpResult>=>{
    
    const createServices=await companyRepository.addServices(services,cid)
    return createServices
}