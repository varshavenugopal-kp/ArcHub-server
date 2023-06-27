import { User} from "../../../Domain/models/User";
import { UserRepository } from "../../../Infra/repositories/userRepository";

export const LoginUser=(UserRepository:UserRepository)=>async(email:string,password:string):Promise<User|null>=>{

    const createdUser=await UserRepository.LoginUser(email);
    if(createdUser && createdUser.password===password){
    return createdUser
    }
    return null;
};