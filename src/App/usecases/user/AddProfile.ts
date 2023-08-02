import mongoos,{ObjectId, UpdateWriteOpResult} from "mongoose";
import { UserRepository } from "../../../Infra/repositories/userRepository";

export const updateImage=(userRepository:UserRepository)=>async(userId:mongoos.Types.ObjectId,image:string):Promise<UpdateWriteOpResult>=>{
    const imageAdd=await userRepository.addImage(userId,image)
    return imageAdd
}