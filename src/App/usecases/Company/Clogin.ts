import { Company } from "../../../Domain/models/Company";
import { companyRepository } from "../../../Infra/repositories/companyRepository";

export const loginCompany=(companyRepository:companyRepository)=>async(email:string,password:string,status:boolean):Promise<Company|null>=>{
    const createdCompany=await companyRepository.loginCompany(email);
    if(createdCompany&& createdCompany.password===password && createdCompany.status===true){
        return createdCompany
    }
    return null;
}