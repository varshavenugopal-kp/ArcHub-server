import { UpdateWriteOpResult } from "mongoose";
import { UserRepository } from "../../../Infra/repositories/userRepository";


export const updateProfile=(UserRepository:UserRepository)=>async(fname:string,lname:string,email:string,uId:string): Promise< UpdateWriteOpResult>=>{
    const pswd=await UserRepository.update(fname,lname,email,uId);
   return pswd
}