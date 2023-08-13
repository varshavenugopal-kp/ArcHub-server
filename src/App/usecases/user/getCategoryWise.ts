import mongoose from "mongoose";
import { companyRepository } from "../../../Infra/repositories/companyRepository";
export const getCompanies=(companyRepository:companyRepository)=>async(category:string)=>{
    const companies=await companyRepository.getCompanyList(category)
    console.log(companies,"heyy");
    return companies?companies:null
    
}