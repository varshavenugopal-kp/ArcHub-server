import { companyRepository } from "../../../Infra/repositories/companyRepository";
import { Company } from "../../../Domain/models/Company";

export const showCompany=(companyRepository:companyRepository)=>async()=>{
    const company=await companyRepository.showCompany()
    return company?company:null
}