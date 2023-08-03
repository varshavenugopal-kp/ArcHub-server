import { UpdateWriteOpResult } from "mongoose";
import { User} from "../../../Domain/models/User";
import { UserRepository } from "../../../Infra/repositories/userRepository";

export const LoginUser=(UserRepository:UserRepository)=>async(email:string,password:string):Promise<User|null>=>{
     console.log(email,"lll");
   
     
     
    const createdUser=await UserRepository.LoginUser(email);
    if(createdUser && createdUser.password===password){
        console.log("mmm",createdUser);
        
    return createdUser
    }
    return null;
};

export const CheckUser=(UserRepository:UserRepository)=>async(email:string)=>{
    const createdUser=await UserRepository.LoginUser(email);
    return createdUser?createdUser:null
}

export const passwordReset=(UserRepository:UserRepository)=>async(email:string,password:string): Promise< UpdateWriteOpResult>=>{
    const pswd=await UserRepository.resetPassword(email,password);
   return pswd
}

