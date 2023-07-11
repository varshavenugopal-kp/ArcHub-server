import mongoos,{ObjectId, UpdateWriteOpResult} from "mongoose";
import { Company } from "../../../Domain/models/Company";
import { companyRepository,companyRepositoryImpl } from "../../../Infra/repositories/companyRepository";

export const addAbout=(companyRepository:companyRepository)=>async(cId:mongoos.Types.ObjectId,description:string):Promise<UpdateWriteOpResult>=>{
    const createAbout=await companyRepository.aboutAdd(cId,description)
    console.log("lllkkk",createAbout);
    
    return createAbout
}