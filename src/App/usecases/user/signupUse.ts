import { UserRepository } from "../../../Infra/repositories/userRepository";
import { User} from "../../../Domain/models/User";

export const signupUser=(UserRepository:UserRepository)=>async(fname:string,lname:string,email:string,password:string,isGoogle:boolean):Promise<User|null>=>{
    const newUser:User={
        fname,
        lname,
        email,
        password,
        isGoogle
    };

    const createdUser=await UserRepository.create(newUser);
    return createdUser
};



