import { UserRepository } from "../../../Infra/repositories/userRepository";
import { User } from "../../../Domain/models/User";

export const showUser=(UserRepository:UserRepository)=>async()=>{
    const user=await UserRepository.showUser()
    console.log("userData",user);
    
    return user?user:null
}
