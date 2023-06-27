import { ObjectId } from "bson";
import { Company } from "../../../Domain/models/Company";
import { companyRepository } from "../../../Infra/repositories/companyRepository";
interface updateResult{
    acknowledged:boolean
    modifiedCount:number
    upsertedId:ObjectId|null
    upsertedCount:number
    matchedCount:number
}

export const unblockCompany=(companyRepository:companyRepository)=>async(id:string):Promise<Company|updateResult|void>=>{
    const blockCompany=await companyRepository.unblockCompany(id)
        return blockCompany
}