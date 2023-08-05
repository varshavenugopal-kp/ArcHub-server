import mongoos,{ObjectId, UpdateWriteOpResult} from "mongoose";
import { companyRepository,companyRepositoryImpl } from "../../../Infra/repositories/companyRepository";

export const addImage=(companyRepository:companyRepository)=>async(cid:mongoos.Types.ObjectId,image:string):Promise<UpdateWriteOpResult>=>{
    const addedImage=await companyRepository.addImage(cid,image)
    console.log("varshaaaaaa");
    
    return addedImage
}
export const addlogo=(companyRepository:companyRepository)=>async(cid:mongoos.Types.ObjectId,image:string):Promise<UpdateWriteOpResult>=>{
    
    const addedImage=await companyRepository.addlogo(cid,image)
    console.log("varshaaaaaa");
    
    return addedImage
}
