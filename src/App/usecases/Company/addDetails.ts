import mongoos,{ObjectId, UpdateWriteOpResult} from "mongoose";
import { Company } from "../../../Domain/models/Company";
import { companyRepository,companyRepositoryImpl } from "../../../Infra/repositories/companyRepository";


export const addDetails=(companyRepository:companyRepository)=>async(cId:mongoos.Types.ObjectId,details:object):Promise<UpdateWriteOpResult>=>{
    
    const createDetails=await companyRepository.detailsAdd(details,cId)
    return createDetails
}