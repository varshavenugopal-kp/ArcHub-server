import { Company } from "../../../Domain/models/Company";
import { companyRepository } from "../../../Infra/repositories/companyRepository";
import { ObjectId } from "bson";
interface updateResult{
    acknowledged:boolean
    modifiedCount:number
    upsertedId:ObjectId|null
    upsertedCount:number
    matchedCount:number
}

export const acceptCompany=(companyRepository:companyRepository)=>async(id:string):Promise<Company|updateResult|void>=>{
    const companyRequest=await companyRepository.requestAccept(id)
        return companyRequest
}