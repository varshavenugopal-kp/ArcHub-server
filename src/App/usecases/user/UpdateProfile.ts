import { UpdateWriteOpResult } from "mongoose";
import { UserRepository } from "../../../Infra/repositories/userRepository";


export const updateProfile=(UserRepository:UserRepository)=>async(fname:string,lname:string,email:string,image:string,uId:string): Promise< UpdateWriteOpResult>=>{
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(image);
    console.log(uId);
    const data=await UserRepository.update(fname,lname,email,image,uId);
   return data
}