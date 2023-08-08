import { companyRepository } from "../../../Infra/repositories/companyRepository";
import { Company } from "../../../Domain/models/Company";

export const showCompany=(companyRepository:companyRepository)=>async(page:number)=>{
    const company=await companyRepository.showCompany(page)
    return company?company:null
}
export const cmpCount=(companyRepository:companyRepository)=>async()=>{
    const company=await companyRepository.cmpCount()
    return company?company:null
}
export const showCompanies=(companyRepository:companyRepository)=>async()=>{
    const company=await companyRepository.showCompanies()
    return company?company:null
}