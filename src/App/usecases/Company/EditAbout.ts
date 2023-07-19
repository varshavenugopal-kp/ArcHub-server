import mongoos,{ObjectId, UpdateWriteOpResult} from "mongoose";

import { companyRepository } from "../../../Infra/repositories/companyRepository";
import { Company } from "../../../Domain/models/Company";
interface updateResult{
    acknowledged:boolean
    modifiedCount:number
    upsertedId:ObjectId|null
    upsertedCount:number
    matchedCount:number
}
export const editAbout=(companyRepository:companyRepository)=>async(id:mongoos.Types.ObjectId,data:string):Promise<UpdateWriteOpResult>=>{
    const aboutEdit=await companyRepository.editAbout(id,data)
    return aboutEdit
    }