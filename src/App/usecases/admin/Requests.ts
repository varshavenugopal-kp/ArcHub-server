import { companyRepository } from "../../../Infra/repositories/companyRepository";

export const showRequests=(companyRepository:companyRepository)=>async()=>{
    const requests=await companyRepository.showRequests()
    console.log("requests",requests);
    return requests?requests:null
    
}