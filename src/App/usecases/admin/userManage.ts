import { UserRepository } from "../../../Infra/repositories/userRepository";
import { User } from "../../../Domain/models/User";
import mongoos,{ObjectId, } from "mongoose";

export const showUser=(UserRepository:UserRepository)=>async()=>{
    const user=await UserRepository.showUser()
    console.log("userData",user);
    
    return user?user:null
}

export const getUser=(UserRepository:UserRepository)=>async(id:mongoos.Types.ObjectId)=>{
    const user=await UserRepository.getSingleUser(id)
    console.log("userData",user);
    
    return user?user:null
}
