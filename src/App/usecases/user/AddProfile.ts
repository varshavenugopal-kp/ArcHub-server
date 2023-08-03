import mongoos,{ObjectId, UpdateWriteOpResult} from "mongoose";
import { UserRepository } from "../../../Infra/repositories/userRepository";

export const updateImage=(userRepository:UserRepository)=>async(userId:mongoos.Types.ObjectId,image:string):Promise<UpdateWriteOpResult>=>{
    console.log("hanish");
    
    const imageAdd=await userRepository.addProImage(userId,image)
    return imageAdd
}