import { companyRepository } from "../../../Infra/repositories/companyRepository";
import { Company } from "../../../Domain/models/Company";
export const signupCompany=(CompanyRepository:companyRepository)=>async(cname:string,location:string,district:string,state:string,email:string,password:string,file:string):Promise<Company|null>=>{
const newCompany:Company={
cname,
location,
district,
state,
email,
password,
file
};
const createdCompany=await CompanyRepository.create(newCompany)

return createdCompany
}