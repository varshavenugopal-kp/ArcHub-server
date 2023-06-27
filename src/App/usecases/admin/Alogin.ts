import { adminRepository } from "../../../Infra/repositories/adminRepository";
import { Company } from "../../../Domain/models/Company";
import { Admin } from "../../../Domain/models/Admin";

export const LoginAdmin=(adminRepository:adminRepository)=>async(email:string,password:string):Promise<Admin|null>=>{
    const createdadmin=await adminRepository.LoginAdmin(email);
    if(createdadmin&&createdadmin.password===password ){
        return createdadmin
    }
    return null
}