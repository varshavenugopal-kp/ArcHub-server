import mongoos,{ObjectId, UpdateWriteOpResult} from "mongoose";
import { Company } from "../../../Domain/models/Company";
import { companyRepository,companyRepositoryImpl } from "../../../Infra/repositories/companyRepository";


export const editDetails=(companyRepository:companyRepository)=>async(cId:mongoos.Types.ObjectId,details:object):Promise<UpdateWriteOpResult>=>{
    
    const createDetails=await companyRepository.detailsEdit(details,cId)
    return createDetails
}
export const getUpdatedCategory=(companyRepository:companyRepository)=>async(cId:mongoos.Types.ObjectId,categories:string,details:string):Promise<UpdateWriteOpResult>=>{
  const updatedCategory=await companyRepository.updateCategory(cId,categories,details)
  return updatedCategory
}
export const getdeletedCategory=(companyRepository:companyRepository)=>async(cId:mongoos.Types.ObjectId,categories:string,details:string):Promise<UpdateWriteOpResult>=>{
    const updatedCategory=await companyRepository.deleteCategory(cId,categories,details)
    return updatedCategory
  }